import styles from './skeletons.module.scss';
import stylesHome from '@/app/styles/home.module.scss';

export const SkeletonOverview = () => {
    return (
        <div className={`${styles.skeleton_overview}`}>
            <div className={styles.skeleton__wrapper_title}>
                <div className={`${styles.pulse} ${styles.skeleton__header}`}></div>
                <div className={`${styles.pulse} ${styles.skeleton__circle}`}></div>
            </div>
            <div className={styles.skeleton__wrapper}>
                <div className={`${styles.pulse} ${styles.skeleton__solidblock_small}`}></div>
                <div className={`${styles.pulse} ${styles.skeleton__solidblock_small}`}></div>
            </div>    
        </div>
    )
}

export const SkeletonAnswers = () => {
    return (
        <div className={styles.skeleton_answers}>
            <div className={`${styles.pulse} ${styles.skeleton__block}`}/>
            <hr/>
            <div className={`${styles.pulse} ${styles.skeleton__solidblock}`}/>
            <div className={styles.skeleton__wrapper}>
                <div className={`${styles.pulse} ${styles.skeleton__btn}`}/>
                <div className={`${styles.pulse} ${styles.skeleton__btn}`}/>
                <div className={`${styles.pulse} ${styles.skeleton__btn}`}/>
                <div className={`${styles.pulse} ${styles.skeleton__btn}`}/>
            </div>
        </div>
    )
}

export const SkeletonQuestions = () => {
    return (
            <div className={`${styles.skeleton_questions}`}>                
                <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
                <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
                <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
                <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>            
            </div>
    )
}


export const HomeSkeleton = () => {
    return (
        <main className={stylesHome.home}>
            <div className='container'>
                <SkeletonOverview/>
                <div className={stylesHome.home__wrapper}>
                    <SkeletonQuestions/>
                    <SkeletonAnswers/>
                </div>
            </div>
        </main> 
    )
}