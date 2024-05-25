"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { Modal } from '../modal/modal';
import { signout, deleteAccount } from '../../lib/data';

import styles from './dashboard.module.scss';
import buttonStyles from '@/app/styles/buttons.module.scss';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        signout();
        Cookies.remove('login');
        Cookies.remove('token');
        setShowModal(true)
        setTimeout(() => {
            setShowModal(false);
            router.push('/');
        }, 6000)
    }

    const handleDelete = async () => {
        await deleteAccount();
        Cookies.remove('login');
        Cookies.remove('token');
        router.push('/')
    }

    return (
        <div className='center-container'>
            <div className={styles.logout__wrapper}>
                <h2>Hello</h2>
                <p>Code-directory: a free online platform with questions on popular programming languages. Study, mark, add questions, and create your learning experience. 🧠✨
                <br/><br/> 
                Log out - exit and save data.🚪💾 <br /> Delete account - conclude all and permanently delete the account.🗑️🔒"</p>
                <div className={styles.logout__buttons}>
                        <button
                        className={buttonStyles.submit__button}
                        onClick = {handleDelete}>Delete Account</button>
                    <button
                        className={buttonStyles.submit__button}
                        onClick = {handleLogout}>Sign Out</button>
                </div>
                <br/><br/> 
                <p>You can contact us for more information:</p>
                <a href="mailto:codedirectoryapp@gmail.com" className='footer__mail'>CodeDirectoryApp@gmail.com</a>
            </div>
            <Modal show={showModal}>
                    <h2>Come back when you're ready.</h2>
                    <p>"Logout complete. Appreciate your use of our service. 🚀"</p>
            </Modal>
        </div>
    )
}

export default Dashboard