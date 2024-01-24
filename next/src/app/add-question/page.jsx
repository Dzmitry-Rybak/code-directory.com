import { AddQuestionForm } from "@/app/components/form/add-question-form";
import styles from '@/app/styles/form.module.scss';
import Link from "next/link";

export const metadata = {
    title: 'Add question',
};

const QuestionAddFormPage = () => {
    return (
        <div className="center-container">
                <div className={styles.form__wrapper}>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>YOUR OWN QUESTION</h2>
                        <p className={styles.form_descr}>
                        Welcome to the team! 🌟 Ready to make a difference? To save changes be sure to <Link className={styles.form_link} href="/signIn">Sign in</Link> to our dynamic community thriving on mutual support in the realm of programming languages.<br/>
                            <br/>
                            Here's your path to influence:
                        </p>
                        <ol className={styles.form_descr}>
                                <li>• Share your expertise through insightful questions. 🧠 </li>
                                <li>• Provide comprehensive answers. 🚀</li>
                                <li>• Your dedication to enriching this knowledge hub for developers is truly appreciated! 👏</li>
                                <li>• Your question may be added to the common database. 🎨</li>
                        </ol>
                    </div>

                    <hr/>
                    <AddQuestionForm/>                    
                </div>
        </div>
    )
}

export default QuestionAddFormPage