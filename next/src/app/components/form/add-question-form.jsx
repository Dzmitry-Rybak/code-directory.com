"use client"
import { useState } from 'react';
// import { useFormState } from 'react-dom';

import styles from '@/app/styles/form.module.scss';
import { postQuestion } from '@/app/lib/actions'
import { SubmitButton } from './submitButton';

const stacks = ['JavaScript', 'React', 'Git', 'Python'];
const languages = ['English', 'Russian', 'Polish'];

export const AddQuestionForm = () => {
    // const initialState = { message: null, errors: {} }; - пока не разобрался с этим
    // const [state, dispatch] = useFormState(postQuestion, initialState);

    const [stack, setStack] = useState('');
    const [language, setLanguage] = useState('');
    const [question, setQuesion] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <form
            action={postQuestion}
            className={styles.form}>
            <h2 className={styles.form__title}>ADD QUESTION</h2>
                <div className={styles.form__input}>
                    <textarea
                        required
                        maxLength={500}
                        name="question" 
                        onChange={e => setQuesion(e.target.value)}
                        value={question}
                        placeholder={'type your questions...'}>
                    </textarea>
                </div>
                <div className={styles.form__input}>
                    <textarea
                        maxLength={3000}
                        required
                        name="answer" 
                        onChange={e => setAnswer(e.target.value)}
                        value={answer}
                        placeholder={'type answer...'}>
                    </textarea>
                </div>
                <div className={styles.form__input}>
                <select 
                    required
                    onChange={e => setStack(e.target.value)}
                    value={stack}
                    name='stack'
                    >
                    <option value="">Select programming stack</option>
                    {stacks.map((item, i) => {
                        return (
                        <option key={i} value={item}>{item}</option>
                        )
                    })}
                </select>
                </div>
                <div className={styles.form__input}>
                    <select 
                        required
                        onChange={e => setLanguage(e.target.value)}
                        value={language}
                        name='language'
                        >
                        <option value="">Select language</option>
                        {languages.map((item, i) => {
                            return (
                            <option key={i} value={item}>{item}</option>
                            )
                        })}
                    </select>
                </div>
                <SubmitButton/>
        </form>
    )
}