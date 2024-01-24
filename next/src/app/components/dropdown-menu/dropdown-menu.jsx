'use client'
import styles from './dropdown-menu.module.scss';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const DropdownStack = ({ stackItems, name }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onSelectLanguage = (e) => {
        const stack = e.target.textContent;
        const params = new URLSearchParams(searchParams);
        params.delete('id');
        params.set('stack', stack);
        
        replace(`${pathname}?${params.toString()}`);
    }
    
    const onRenderStack = () => (
        stackItems.map((item, i) => ((
                <li key={i}>
                    <button 
                        className={`${styles.dropdown__item} ${styles.active}`}
                        onClick={onSelectLanguage}
                        >{item}</button> 
                </li>
            ))
        )
    )
    const stackBtns = onRenderStack();
    
    return (
        <div className={styles.dropdown}>
            <button aria-expanded="false">
                {name}
            </button>
            <ul className={styles.dropdown__menu}>
                {stackBtns}
            </ul>
        </div>
    )
}

export const DropdownTranslate = ({ languagesItems, name }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onSelectLanguage = (e) => {
        const language = e.target.textContent;
        const params = new URLSearchParams(searchParams);
        params.set('language', language);
        
        replace(`${pathname}?${params.toString()}`);
    }
    
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
        <div className={styles.dropdown}>
            <button aria-expanded="false">
                {name}
            </button>
            <ul className={styles.dropdown__menu}>
                {languageBtns}
            </ul>
        </div>
    )
}