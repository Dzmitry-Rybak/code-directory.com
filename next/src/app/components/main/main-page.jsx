'use client'
import { useState, useEffect } from "react";

import { QuestionsOverview } from "../quesitons/questions-overview";
import { QuestionsView } from "../quesitons/questions-view";
import Answers from "../answers/answers";
import { postFilteredQuestons } from "../../lib/data";

import styles from '@/app/styles/home.module.scss';

const MainPage = ({stack,language, questionId, questionsData, answerById, repeat, memorized}) => {
    const [repeatQuestion, setRepeatQuestion] = useState([]);
    const [memorizedQuestions, setMemorizedQuestions] = useState([]);

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

        await postFilteredQuestons(stack, language, 'repeat', updatedRepeatQuestions);
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

        await postFilteredQuestons(stack, language, 'memorized', updatedMemorizedQuestions);
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
        </div>
    )
}

export default MainPage