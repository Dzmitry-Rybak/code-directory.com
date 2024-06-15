'use client'
import styles from './dropdown-menu.module.scss';
import {useState} from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import stylesHeader from  '@/app/components/header-nav/header-nav.module.scss';

export const DropdownStack = ({ stackItems, name, setDisableLanguagePicker }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const getLanguageForStack = (stackValue) => {
        const selectedStack = stackItems.find(stack => stack.value === stackValue);
        return selectedStack?.language || '';
    };

    const toggleDropdownMenu = () => {
        setIsOpen(prev => !prev);
    };


    const onSelectLanguage = (value) => {
        const params = new URLSearchParams(searchParams);
        params.delete('id');
        params.set('stack', value);
        const specialLanguage = getLanguageForStack(value);
        if (specialLanguage) {
            params.set('language', specialLanguage);
            setDisableLanguagePicker(true);
        } else {
            setDisableLanguagePicker(false);
        }
        setIsOpen(false)
        replace(`${pathname}?${params.toString()}`);
    }
    
    const onRenderStack = () => {
        return (
            stackItems.map((item, i) => ((
                    <li key={i}>
                        <button 
                            className={`${styles.dropdown__item} ${styles.active}`}
                            onClick={() => onSelectLanguage(item.value)}
                            >{item.label}</button> 
                    </li>
                ))
        )
        )
    }
    const stackBtns = onRenderStack();
    
    return (
        <div className={`${styles.dropdown} ${isOpen ? styles.dropdown_active : ''}`}>
            <button aria-expanded="false" onClick={toggleDropdownMenu}>
                {name}
            </button>
            <ul className={styles.dropdown__menu}>
                {stackBtns}
            </ul>
        </div>
    )
}

export const DropdownTranslate = ({languagesItems, name, disableLanguagePicker }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const onSelectLanguage = (e) => {
        const language = e.target.textContent;
        const params = new URLSearchParams(searchParams);
        params.set('language', language);
        replace(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    }

    const toggleDropdownMenu = () => {
        setIsOpen(prev => !prev);
    };
    
    const onRenderLanguages = () => (
        languagesItems.map((item, i) => ((
                <li key={i}>
                    <button 
                        className={`${styles.dropdown__item} ${styles.active}`}
                        onClick={onSelectLanguage}
                        >{item}</button> 
                </li>
            ))
        )
    )
    const languageBtns = onRenderLanguages();
    
    return (
        <div className={`${styles.dropdown} ${isOpen ? styles.dropdown_active : ''}`}>
            <button aria-expanded="false" onClick={toggleDropdownMenu}>
                {name}
            </button>
            {disableLanguagePicker ? null : (
                <ul className={styles.dropdown__menu}>
                    {languageBtns}
                </ul>
            )}
        </div>
    )
}

const DropdownMenu = ({pickerStack, pathname}) => {
    const [disableLanguagePicker, setDisableLanguagePicker] = useState(false);

    return (
        <div style={{display: 'flex', width: '40%', justifyContent: 'space-around', fontSize: '20px'}}>
            <li className={stylesHeader.header__item}>
                {pathname === '/' ? (
                    <DropdownStack
                    setDisableLanguagePicker={setDisableLanguagePicker}
                    stackItems={pickerStack}
                    name={'Coding stack'}/>
                ) :null}
            </li>
            
            <li className={stylesHeader.header__item}>
            {pathname === '/' ? (
                <DropdownTranslate
                    disableLanguagePicker={disableLanguagePicker}
                    stackItems={pickerStack}
                    languagesItems={['Russian', 'Polish', 'English']}
                    name={'Language'}/>
            ) : null}
            </li>
        </div>
    )
}
export default DropdownMenu;