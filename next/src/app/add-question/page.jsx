import { AddQuestionForm } from "@/app/components/form/add-question-form";
import styles from '@/app/styles/form.module.scss';
import Image from "next/image";

export const metadata = {
    title: 'Add question',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

const QuestionAddFormPage = () => {
    return (
        <div className="center-container">
                <div className={styles.form__wrapper}>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>YOUR OWN QUESTION</h2>
                        <p style={{ lineHeight: '30px', fontSize: 18, textAlign: 'left'}}>Simply enter your questions and answers, and they will only be visible to you in your account.</p>
                        <Image src='/icons/question.png' alt='question' width={250} height={250}/> 
                    </div>

                    <hr/>
                    <AddQuestionForm/>                    
                </div>
        </div>
    )
}

export default QuestionAddFormPage