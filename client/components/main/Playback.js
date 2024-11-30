import styles from '@/styles/Playback.module.scss';
import { IoPlayCircle, IoPauseCircle, IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';

const Playback = () => {
    return (
        <div className={styles.playback}>
            <div className={styles.bookInfo}>
                <h1>1177 B.C: The Year Civilization Collapsed</h1>
                <p>Prologue: The Collapse of Civilizations: 1177 BC</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.timeControl}>
                    <span>-13:26</span>
                    <div className={styles.progressBar}>
                        <div className={styles.progress}></div>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button className={styles.skip}><IoPlaySkipBack /></button>
                    <button className={styles.playPause}><IoPlayCircle /></button>
                    <button className={styles.skip}><IoPlaySkipForward /></button>
                </div>

                <div className={styles.actions}>
                    <button className={styles.speed}>1.0x</button>
                    <button className={styles.bookmark}><IoBookmark /></button>
                </div>
            </div>
        </div>
    );
};

export default Playback;
