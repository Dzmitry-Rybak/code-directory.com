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

export const ModalError = ({show}) => {
    return (
        <CSSTransition
        in={show}
        timeout={5000}
        classNames={{
            enter: styles.modal__error_enter,
            enterDone: styles.modal__error_enter_done,
            exit: styles.modal__error_exit,
            exitDone: styles.modal__error_exit_done,
          }}>
                <div className={styles.modal__error}>
                    <h2>To access the ability to filter questions, please Sign In.</h2>
                </div>
    </CSSTransition>

    )
}