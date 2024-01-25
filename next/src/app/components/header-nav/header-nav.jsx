"use client"
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAppState } from '@/app/context';
import Cookies from 'js-cookie';

import {DropdownStack, DropdownTranslate} from '../dropdown-menu/dropdown-menu';

import styles from  '@/app/components/header-nav/header-nav.module.scss';


const Header = () => {
    const { burgerToggle, onToggleBurger } = useAppState();
    const [userLogin, setUserLogin] = useState(null);
    const login = Cookies.get('login')

    useEffect(() => {
        if(login) {
            setUserLogin(login)
        } else {
            setUserLogin(null)
        }
    }, [login])

    const pathname = usePathname()

    return (
    <header className={styles.header}>
        <nav className={styles.header__nav}>
            <ul className={styles.header__items}>
            
            {pathname === '/' ? (
                <button 
                    className={clsx(
                        [styles.burger],
                        {
                            [styles.burger_active]: burgerToggle
                        }
                    )}
                    onClick = {onToggleBurger}>
                    <span/>
                </button>
            ) : null}
                
                <li className={styles.header__item}>
                    <Link href="/" className={clsx(
                        `${styles.header__link} ${styles.header__wrapper__link}`,
                        {
                            [styles.active]: pathname === '/'
                        }, 
                    )}>
                        <Image 
                            src='/logo.svg'
                            alt="logo"
                            className={styles.header__img} 
                            width="50" 
                            height="50" />
                        <span>CodeDirectory</span>
                    </Link>  
                </li>

                <li className={styles.header__item}>
                    {pathname === '/' ? (
                        <DropdownStack
                        stackItems={['JavaScript', 'React', 'Git', 'Python']}
                        name={'Coding stack'}/>
                    ) :<span>Coding stack</span>}
                </li>
                
                <li className={styles.header__item}>
                {pathname === '/' ? (
                    <DropdownTranslate
                        languagesItems={['Russian', 'Polish', 'English']}
                        name={'Language'}/>
                ) : <span>Language</span>}
                </li>
                
                <li className={styles.header__item}>
                    <Link
                        href="/add-question"
                        className={clsx(
                            {
                                [styles.active]: pathname === '/add-question'
                            },
                        )}>Add question</Link>
                </li>
                <li className={`${styles.header__item} ${styles.header__login}`}>
                    <Link 
                        href={!userLogin ? "/signIn" : "/dashboard"}
                        className={clsx(
                            {
                                [styles.active]: pathname === '/signIn'
                            },
                        )}>
                        {!userLogin ? "SignIn" : login || "Unknown"}
                    </Link>
                </li>
            </ul>
        </nav>
    </header>        
    )
}

export default Header;