'use client'
import { useState, useEffect } from "react";
import { QuestionsVisible, QuestionsHidden } from "./questions-ui";
import { SkeletonQuestions } from "../skeletons/skeletons";

const Questions = ({questions, repeatQuestion, memorizedQuestions, onFilterQuestions, filter}) => {
        const [isSmallScreen, setIsSmallScreen] = useState(false);
        const [loading, setLoading] = useState(true);
        
        const handleResize = () => {
            // Settings for the visible screen area height, excluding control panels.
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // hide questions in burger-menu if screen less then 992px
            setIsSmallScreen(window.innerWidth <= 992);
            setLoading(false)
        } 
    
        useEffect(() => {
            handleResize();
            window.addEventListener('resize', handleResize) 
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        const QuestionsComponent = isSmallScreen ? QuestionsHidden : QuestionsVisible;

        return !loading ? 
        <QuestionsComponent
                    questions={questions}
                    filter={filter}
                    repeatQuestion={repeatQuestion}
                    memorizedQuestions={memorizedQuestions}
                    onFilterQuestions={onFilterQuestions} /> :
        <SkeletonQuestions/>
}

export default Questions;