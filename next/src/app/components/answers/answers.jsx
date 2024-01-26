'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import FullscreenView from './fullScreen.jsx';

import styles from './answers.module.scss';
import stylesBtn from '@/app/styles/buttons.module.scss';

const Answers =  ({questionId, answerById, onMemorizedQuestion, onRepeatQuestion, lastQuestionId}) => {
    const {replace} = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [activeClass, setActiveClass] = useState(false);
    const [activeFullScreen, setActiveFullScreen] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [disablePrevButton, setDisablePrevButton] = useState(false);

    const {question, answer, example_path} = answerById;

    const buttonName = !activeClass ? 'Example' : 'Hide';

    useEffect(() => {
        // If the question is the last or the first, we disable the button.
        setDisableNextButton(questionId === lastQuestionId);
        setDisablePrevButton(questionId === 1);
    }, [questionId, lastQuestionId])

    const onToggleActive = (activeClass) => {
        setActiveClass(!activeClass)
    }

    const onFullScreenImg = (state) => { 
        setActiveFullScreen(!state)
    }

    const onChangeQuestion = async (e) => {
        let nextQuestionId;

        if(e.target.dataset.action === 'next' || e.target.dataset.action === 'Memorized') {
            nextQuestionId = ++questionId;
        } else if(e.target.dataset.action === 'prev') {
            nextQuestionId = --questionId;
        }

        // window.localStorage.setItem('id', JSON.stringify(nextQuestionId)) // - Do not need to, because the question is accessible from the URL
        const params = new URLSearchParams(searchParams);
        params.set('id', nextQuestionId)
        replace(`${pathname}?${params.toString()}`);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const isAvailableImg = example_path !== 'not available' ? <img
                                                                    className={clsx(
                                                                        [styles.answers__image],
                                                                        {
                                                                            [styles.active]: activeClass
                                                                        }
                                                                    )}
                                                                    src={example_path} 
                                                                    alt="example"
                                                                    onClick={() => onFullScreenImg(activeFullScreen)}
                                                                    />
                                                                : <h4 className={clsx(
                                                                    [styles.answers__image],
                                                                    {
                                                                        [styles.active]: activeClass
                                                                    })}>Sorry, there is no example</h4>
    return (        
            <div className={styles.answers}>
                <div className={styles.answers__question}>
                    {question}
                </div>
                <hr/>
                <div className={styles.answers__text}>
                    <pre>{answer}</pre>
                </div>
                <div className={styles.answers__btn}>
                    <button 
                        className={clsx(
                            [stylesBtn.button],
                            {
                                [stylesBtn.button__disable]: disablePrevButton
                            }
                        )}
                        data-action="prev"
                        disabled={disablePrevButton}
                        onClick={onChangeQuestion}>Prev question</button>

                    <button 
                    className={`${stylesBtn.button}`}
                    data-action="Example"
                    onClick={() => onToggleActive(activeClass)}>{buttonName}</button>
                    
                    <button 
                        className={clsx(
                            [stylesBtn.button],
                            {
                                [stylesBtn.button__disable]: disableNextButton
                            }
                        )}
                        data-action="next"
                        disabled={disableNextButton}
                        onClick={onChangeQuestion}>Next question</button>

                    <button 
                    className={`${stylesBtn.button}`}
                    data-action="Repeat"
                    onClick={() => {
                        onRepeatQuestion(questionId);
                        scrollToTop()}}>Repeat</button>

                    <button 
                    className={`${stylesBtn.button}`}
                    style={{ gridRow: "2", gridColumn: "3" }}
                    data-action="Memorized"
                    onClick={(e) => {
                        onMemorizedQuestion(questionId);
                        scrollToTop()
                        // error prom database "repeat: null" cause need await  from DB
                        //onChangeQuestion(e)
                        }}>Memorized</button>
                </div>
                {!activeFullScreen ? 
                    <div className={styles.answers__example}>{isAvailableImg}</div> 
                : 
                    <FullscreenView isAvailableImg={isAvailableImg} onFullScreenImg={onFullScreenImg} activeFullScreen={activeFullScreen}/>}
            </div>
        )
}

export default Answers