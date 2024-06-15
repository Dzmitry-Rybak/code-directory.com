"use client"
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAppState } from '@/app/context';
import Cookies from 'js-cookie';

import DropdownMenu from '../dropdown-menu/dropdown-menu';
import { getCodeForPickerStack } from '@/app/lib/data';
import styles from  '@/app/components/header-nav/header-nav.module.scss';


const Header = () => {
    const { isCodeAdded, onCodeAdded, burgerToggle, onToggleBurger } = useAppState();
    const [userLogin, setUserLogin] = useState(null);
    const login = Cookies.get('login');

    const initialPickerStack = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'React', value: 'react' },
        { label: 'Git', value: 'git' },
        { label: 'Python', value: 'python' },
    ];

    const [pickerStack, setPickerStack] = useState(initialPickerStack);

    const gettingPickerStackFromDB = async () => {
        if (login) {
            try {
                const data = await getCodeForPickerStack();

                if (data.stacks) {
                    const newStacks = data.stacks.map(stack => ({
                        label: stack.label,
                        value: stack.value,
                        language: stack.language
                    }));
                    
                    // Проверка на уникальность данных перед добавлением
                    setPickerStack(prevState => {
                        const combinedStacks = [...prevState, ...newStacks];
                        return combinedStacks.filter((stack, index, self) =>
                            index === self.findIndex((t) => (
                                t.value === stack.value
                            ))
                        );
                    });

                }
            } catch (error) {
                console.error("Error fetching picker stack from DB:", error);
            }
        } else {
            setPickerStack(initialPickerStack);
        }
    };

    useEffect(() => {
        gettingPickerStackFromDB();
    }, [])

    useEffect(() => {
        gettingPickerStackFromDB();
        onCodeAdded(false);
        if(login) {
            setUserLogin(login)
        } else {
            setUserLogin(null)
        }
    }, [login, isCodeAdded])

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
                        <span style={{fontSize: '18px'}}>CodeDirectory</span>
                    </Link>  
                </li>
                
                        <DropdownMenu pickerStack={pickerStack} pathname={pathname}/>
                
                
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