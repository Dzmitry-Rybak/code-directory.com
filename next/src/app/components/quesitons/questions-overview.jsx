'use client'
import stylesUi from './questionsUi.module.scss';
import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import iconJS from '../../../../public/icons/languages/javascript.svg';
import iconReact from '../../../../public/icons/languages/react.png';
import iconGit from '../../../../public/icons/languages/git.png';
import iconPython from '../../../../public/icons/languages/python.png';
import iconLogo from '../../../../public/logo.svg';

const getLanguageData = (stack) => {
    stack = stack.toLowerCase();
  
    switch (stack) {
        case 'react':
            return { name: 'React', icon: iconReact };
        case 'git':
            return { name: 'Git', icon: iconGit };
        case 'python':
            return { name: 'Python', icon: iconPython };
        case 'javascript':
            return { name: 'JavaScript', icon: iconJS };
        default:
            return { name: stack, icon: iconLogo };
    }
};

export const QuestionsOverview = memo(function QuestionsOverview({memorizedQuestionsLength, stack, questionsCount}) {
    const [programmingLang, setProgrammingLang] = useState(getLanguageData(stack))
    useEffect(() => {
        setProgrammingLang(getLanguageData(stack))
    }, [stack])
    return (
        <>
        <div className={stylesUi.overview__language}>
            <h1 className={stylesUi.overview__title}>{programmingLang.name}</h1>
            <Image 
                src={programmingLang.icon} 
                alt="language" 
                className={stylesUi.overview__icon} 
                width='50' 
                height='50'/>
        </div>
        <div className={stylesUi.overview__questions}>
            <div className={stylesUi.overview__descr}>
            Here, you'll find a set of <span>{questionsCount}</span> questions and answers, along with code examples, designed to help you learn  <span>{programmingLang.name}</span>.
            </div>
            <div className={stylesUi.range__state}>
                <ul className={stylesUi.range__lists}>
                    <div className={stylesUi.range__propgress}>
                        <li className={stylesUi.range__list}>Progress:</li>
                        <div className={stylesUi.range__scale}>
                            <div className={stylesUi.range__scale}>
                                <span style={{ width: `${(memorizedQuestionsLength * 100) / questionsCount}%` }}></span>
                            </div>
                        </div>
                        <div className={stylesUi.range__amount}>{memorizedQuestionsLength}/{questionsCount}</div>
                    </div>
                </ul>
            </div>
        </div>
        </>
    )
})