import MainPage from "./components/main/main-page";
import { Suspense } from "react";
import { notFound } from 'next/navigation';
import Link from "next/link";

import { fetchQuestionsData, getFilteredQuestions } from "./lib/data";

import { HomeSkeleton } from "./components/skeletons/skeletons";

export const metadata = {
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
};

export default async function Home({searchParams}) {

    const stack = searchParams?.stack?.toLowerCase() || 'javascript';
    const language = searchParams?.language?.toLowerCase() || 'english';
    
    const questionId = parseInt(searchParams?.id) || 1;
    const [questionsData] = await Promise.all([
        fetchQuestionsData(stack, language).then(data => {
            return data
        })
    ]);

    if(questionsData.message === 'The specified table does not exist') {
        return (
            <div className="center-container">
            <div className="error-container">
                <h1 style={{fontSize: 30}}>Oops...</h1>
                <p style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>Unfortunately, we cannot find the programming language or translation you specified :(</p>
                
                <Link style={{textDecoration: 'underline', fontSize: 20, color: '#cab728'}} href="/">Go back</Link>
                
            </div>
        </div>
        )
    }


    const filtersRequest = await getFilteredQuestions(stack, language);

    let repeat = [];
    let memorized = [];
    
    if (filtersRequest.message === 'Data received successfully' && filtersRequest.data) {
        const { data: { repeat: repeatData, memorized: memorizedData } } = filtersRequest;
        // repeat = repeatData !== null ? repeatData : []; - if i want go next quest when click memorized
        repeat = repeatData;
        memorized = memorizedData;
    }

    const pickedQ = questionsData.data.findIndex(question => {
        return question.row_num == questionId
    })
    const answerById = questionsData.data[pickedQ]
    
    if(!answerById){
        // If there is no question with the given ID, we will return the "not-found" page.
        notFound();
    }

    return (
        <Suspense fallback={<HomeSkeleton/>}>
                <MainPage
                    questionsData={questionsData.data}
                    stack={stack}
                    repeat={repeat}
                    memorized={memorized}
                    language={language}
                    questionId={questionId}
                    answerById={answerById}/>
        </Suspense>
    )
}