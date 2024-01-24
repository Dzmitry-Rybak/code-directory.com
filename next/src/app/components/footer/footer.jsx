import Link from 'next/link';
import Image from 'next/image';
import styles from  '@/app/components/footer/footer.module.scss';
import config from "@/config/config";

const Footer = () => {
    const instagram = config.socialLinks.instagram
    const telegram = config.socialLinks.telegram
    const patreon = config.socialLinks.patreon

    return (
        <div className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__socialmedia}>
                    <Link href={instagram} target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/instagram.png' 
                            alt="instagram" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <Link href={telegram} target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/telegram.svg' 
                            alt="telegram" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <Link href={patreon} target='_blank' rel="noopener noreferrer">
                        <Image 
                            src='/icons/donate.png'
                            alt="donate" 
                            className={styles.footer__icon}
                            width='30'
                            height='30'/>
                    </Link>
                    <a href="mailto:codedirectoryapp@gmail.com" className={styles.footer__mail}>CodeDirectoryApp@gmail.com</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;