import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';

import styles from './modal.module.scss';

export const Modal = ({children, show}) => {
    return (
        <CSSTransition
            in={show}
            timeout={5000}
            classNames={{
                enter: styles.modal_enter,
                enterDone: styles.modal_enter_done,
                exit: styles.modal_exit,
                exitDone: styles.modal_exit_done,
              }}>
                <div className={styles.modal}>
                    {children}
                </div>
        </CSSTransition>
    )
}

export const ModalError = () => {
    return (
        <div className={styles.modal__error}>
            <h2>To unlock adding questions you just need to sign in</h2>
            <br />
            <h3>Please, <Link to="/logIn" className='link'>Sign In</Link></h3>
        </div>
    )
}