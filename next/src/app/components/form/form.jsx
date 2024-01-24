'use client'
import { useState } from 'react';
import { Formik, Form, ErrorMessage} from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { TextInput, Checkbox } from './inputForm';
import { validSchemaSignIn, validSchemaSignUp } from './validSchema';
import { fetchUser } from '../../lib/data'; 
import { setCookies } from '../../lib/cookies';

import { Modal } from '../modal/modal';

import styles from '@/app/styles/form.module.scss';
import buttonsStyles from '@/app/styles/buttons.module.scss';



export const SignInForm = () => {
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validSchemaSignIn}
                onSubmit={async (values, {setSubmitting})  => {
                    try {
                        const data = await fetchUser('signin', values);
                        
                        if (data.message === 'sign in succesfull') {
                            await setCookies(data.user.name, data.token, 'login', 'token');
                            setShowModal(true);
                            setTimeout(() => {
                                setShowModal(false);
                                router.push('/');
                            }, 5000)
                        } else if (data.message === 'Password incorrect') {
                            setInvalidPassword(true);
                            setTimeout(() => {
                                setInvalidPassword(false);
                            }, 3000)
                        } else if (data.message === 'There is no users with this email') {
                            setInvalidEmail(true);
                            setTimeout(() => {
                                setInvalidEmail(false);
                            }, 3000)
                        }
                    } catch(error) {
                        console.error('Error while submitting:', error)
                    } finally {
                        setSubmitting(false)
                    }
                }}>
                <Form className={styles.form}>
                    <h2 className={styles.form__title}>SIGN IN</h2>

                    <div className={styles.form__input}>
                        <TextInput
                            name="email" 
                            type="email"
                            placeholder={'EMAIL'}
                        />
                        {invalidEmail ? <span className={styles.error__style}>No account associated with the email address</span> : null}
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="password" 
                            type="password"
                            placeholder={'PASSWORD'}
                        />
                        {invalidPassword ? <span className={styles.error__style}>Incorrect password. please try again</span> : null}
                    </div>
                    <button type="submit" className={buttonsStyles.submit__button}>SIGN IN</button>
                </Form>
            </Formik>
            <Modal show={showModal}>
                <h2>Successfully!</h2>
                <p>You can also add questions that interest you and begin your preparation.</p>
            </Modal>
        </>
    )
}

export const SignUpForm = () => {
    const [emailExists, setEmailExists] = useState(false);
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Formik 
                initialValues={{
                    login: '',
                    email: '',
                    emailConfirm: '',
                    password: '',
                    passwordConfirm: '',
                    terms: false
                }}
                validationSchema={validSchemaSignUp}
                onSubmit={async (values, {setSubmitting})  => {
                    try {
                        const data = await fetchUser('signup', values);
                        if(data.message === 'Email is already exists') {
                            setEmailExists(true);
                        } else {
                            await setCookies(data.user.name, data.token, 'login', 'token')
                            setEmailExists(false);
                            setShowModal(true);
                            setTimeout(() => {
                                setShowModal(false);
                                router.push('/');
                            }, 5000)
                        }
                    } catch(error) {
                        console.error('Error while submitting:', error)
                    } finally {
                        setSubmitting(false)
                    }
                }}>
                <Form className={styles.form} >
                    <h2 className={styles.form__title}>SIGN UP</h2>
                    <div className={styles.form__input}>
                        <TextInput
                            name="login" 
                            type="text"
                            placeholder={'LOGIN'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="email" 
                            type="email"
                            placeholder={'EMAIL'}
                        />
                        {emailExists ? <span className={styles.error__style}> Email is already exists, you can try logging</span> : null}
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="emailConfirm" 
                            type="email"
                            placeholder={'CONFIRM EMAIL'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="password" 
                            type="password"
                            placeholder={'PASSWORD'}
                        />
                    </div>
                    <div className={styles.form__input}>
                        <TextInput
                            name="passwordConfirm" 
                            type="password"
                            placeholder={'CONFIRM PASSWORD'}
                        /> 
                    </div>
                    <Checkbox name='terms'>
                        I confirm that I've read and I agree to the site's <Link href="https://code-directory.com/Terms-and-Conditions_code-directory_Jen24.pdf" style={{textDecoration: "underline", color: "#7e4444"}}>Terms & Conditions</Link> *
                    </Checkbox>
                    <button type="submit" className={buttonsStyles.submit__button}>SIGN UP</button>
                    <ErrorMessage className={styles.error} name='text' component="div"/>
                </Form>
            </Formik>
            <Modal show={showModal}>
                <h2>Successfully!</h2>
                <p>You can also add questions that interest you and begin your preparation.</p>
            </Modal>
        </>
    )
}