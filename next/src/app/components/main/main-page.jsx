'use client'
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

import { QuestionsOverview } from "../quesitons/questions-overview";
import { QuestionsView } from "../quesitons/questions-view";
import Answers from "../answers/answers";
import { postFilteredQuestons } from "../../lib/data";
import { ModalError } from "../modal/modal";

import styles from '@/app/styles/home.module.scss';

const MainPage = ({stack,language, questionId, questionsData, answerById, repeat, memorized}) => {
    const [repeatQuestion, setRepeatQuestion] = useState([]);
    const [memorizedQuestions, setMemorizedQuestions] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const {replace} = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('stack', stack)
        params.set('language', language)
        replace(`${pathname}?${params.toString()}`);
    }, [stack, language]);


    useEffect(() => {
        setRepeatQuestion(repeat);
        setMemorizedQuestions(memorized);
    }, [repeat, memorized])


    const onRepeatQuestion = async id => {
        let updatedRepeatQuestions = [];
        if (repeatQuestion.includes(id)) {
            updatedRepeatQuestions = repeatQuestion.filter(questionId => questionId !== id);
        } else {
            updatedRepeatQuestions = [...repeatQuestion.filter(questionId => !memorizedQuestions.includes(questionId)), id];
        }
        
        const updatedMemorizedQuestions = memorizedQuestions.filter(questionId => !updatedRepeatQuestions.includes(questionId))
        setRepeatQuestion(updatedRepeatQuestions);
        setMemorizedQuestions(updatedMemorizedQuestions);

        const resRepeat = await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
        if(resRepeat.message === 'Unauthorized') {
            setIsAuthorized(true);
            setTimeout(() => {
                setIsAuthorized(false)
            }, 3000)
        }
        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);

    }
      
    const onMemorizedQuestion = async id => {
        let updatedMemorizedQuestions = [];
        if (memorizedQuestions.includes(id)) {
            updatedMemorizedQuestions = memorizedQuestions.filter(questionId => questionId !== id);
        } else {
            updatedMemorizedQuestions = [...memorizedQuestions.filter(questionId => !repeatQuestion.includes(questionId)), id];
        }

        const updatedRepeatQuestions = repeatQuestion.filter(questionId => !updatedMemorizedQuestions.includes(questionId))
        setMemorizedQuestions(updatedMemorizedQuestions);
        setRepeatQuestion(updatedRepeatQuestions);

        const resMemorized = await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
        if(resMemorized.message === 'Unauthorized') {
            setIsAuthorized(true);
            setTimeout(() => {
                setIsAuthorized(false);
            }, 3000)
        }

        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
    }

    return (
        <div className="container">
            <QuestionsOverview stack={stack} questionsCount={questionsData.length} memorizedQuestionsLength={memorizedQuestions.length}/>
            <div className={styles.home__wrapper}>
                <QuestionsView 
                    questionData={questionsData}
                    repeatQuestion={repeatQuestion}
                    memorizedQuestions={memorizedQuestions}/>
                <Answers
                    lastQuestionId={questionsData.length}
                    answerById={answerById}
                    questionId={questionId} 
                    onRepeatQuestion={onRepeatQuestion}
                    onMemorizedQuestion={onMemorizedQuestion}/>                           
           </div>
           <ModalError show={isAuthorized}/>
           {/* <Modal show={isAuthorized}>
                    <h2>Please</h2>
                    <p>Sign up to save your filtered questions</p>
            </Modal> */}
        </div>
    )
}

export default MainPage