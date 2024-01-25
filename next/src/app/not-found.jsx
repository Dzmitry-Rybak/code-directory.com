'use client'
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/app/styles/not-found.module.scss'

const Page404 = () => {


    return (
        <div className="center-container">
            <div className={styles.notfound}>
                <div className={styles.notfound__descr}>
                    <h2>Oops!</h2>
                    <h3>We can't seem to find the page you are looking for.</h3>
                    <Link href='/' className={styles.notfound__link}>Go back</Link> , or refresh your page.
                </div>
                <Image src='/not-found.png' alt='404 error' width={466} height={893} className={styles.notfound__img}/> 
            </div>
        </div>
    )
}

export default Page404;