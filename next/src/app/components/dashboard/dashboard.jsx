"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Modal } from '../modal/modal';
import { signout, deleteAccount } from '../../lib/data';
import { handleVerifyCode } from '../../lib/data';
import { useAppState } from '@/app/context';
import styles from './dashboard.module.scss';
import buttonStyles from '@/app/styles/buttons.module.scss';

const Dashboard = () => {
    const { onCodeAdded } = useAppState();

    const [showModalCode, setShowModalCode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [isCodeCorrect, setIsCodeCorrect] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const router = useRouter();

    const handleLogout = () => {
        signout();
        scrollToTop();
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            router.push('/');
        }, 3300)
    }

    const handleDelete = async () => {
        await deleteAccount();
        router.push('/');
    }

    const handleChange = (event) => {
        setCode(event.target.value);
    };

    const checkingCode = async () => {
        await handleVerifyCode(code)
            .then(data => {
                if( data.message ) {
                    setIsCodeCorrect(false)
                    setTimeout(() => {
                        setIsCodeCorrect(true)    
                    }, 5000);
                } else {
                    scrollToTop();
                    setShowModalCode(true);
                    setTimeout(() => {
                        setShowModalCode(false);
                    }, 5000);
                    onCodeAdded(true);
                }
            })
    }

    return (
        <div className='center-container'>
            <div className={styles.logout__wrapper}>
                <h2 style={{marginBottom: '20px'}}>Hello 👋</h2>
                <p>Code-directory is a free online platform. You can study, mark, add questions and create your own learning experience.🧠</p>
                <div className={styles.logout__code}>
                    <p style={{lineHeight: '25px'}}>The key code is basically a special password that gives you access to extra materials and resources for your specific course!</p>
                    <br></br>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image src='/icons/oncomputer.png' alt='question' width={200} height={200}/> 
                        <input
                            className={styles.dashboard__input}
                            value={code}
                            onChange={handleChange}
                            placeholder='Enter the key'
                            />
                    
                        <div style={!isCodeCorrect ? {display: 'block'} : {display: 'none'}}><p style={{color: 'red'}}>Incorrect code</p></div>
                        <button
                            className={buttonStyles.submit__button}
                            onClick={checkingCode}>Try it!</button>
                    </div>
                <p style={{marginTop: 20, fontWeight: 'bold'}}>Contact us to find out more :)</p>
                </div>
                <br/><br/> 
                <div style={{width: '90%', borderWidth: '2px', borderStyle: 'solid', padding: 20, borderRadius: 15, backgroundColor: '#83b9ff' }}>
                    <p>You can contact us for more information:</p>
                    <a href="mailto:codedirectoryapp@gmail.com" className='footer__mail' style={{fontWeight: 'bold'}}>CodeDirectoryApp@gmail.com</a>
                </div>
                <div className={styles.logout__buttons}>
                        <button
                        className={buttonStyles.submit__button}
                        onClick = {handleDelete}>Delete Account</button>
                    <button
                        className={buttonStyles.submit__button}
                        onClick = {handleLogout}>Sign Out</button>
                </div>
            </div>
            <Modal show={showModal}>
                    <p style={{fontWeight: 'bold', fontSize: 18}}>Logout complete successfully. 🤚</p>
            </Modal>
            <Modal show={showModalCode}>
                    <p style={{fontWeight: 'bold', fontSize: 18}}>Your code has been successfully added.</p>
                    <Image src='/icons/added.png' alt='question' width={40} height={40}/> 
            </Modal>
        </div>
    )
}

export default Dashboard