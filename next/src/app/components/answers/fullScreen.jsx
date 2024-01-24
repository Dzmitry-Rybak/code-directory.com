import styles from './answers.module.scss';

const FullscreenView = ({isAvailableImg, onFullScreenImg, activeFullScreen}) => (
    <div onClick={() => onFullScreenImg(activeFullScreen)}>
        <div className={styles.blur__overlay}/>
        <div className={`${styles.answers__example} ${styles.fullscreen}`}>
            {isAvailableImg}
        </div>
    </div>
)

export default FullscreenView