import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "@/styles/LockScreen.module.scss";
import StatusBar from "@/components/StatusBar";
import { IoIosFlashlight, IoIosCamera  } from "react-icons/io";
import { useRouter } from 'next/router';
import wallpaperImage from '@/images/wallpaper.jpeg';

import { books } from '@/data/books';

const LockScreen = ({ onUnlock }) => {
    const router = useRouter();
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Update time and date
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }));
            setDate(now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            }));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Swipe handling
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isUpSwipe = distance > minSwipeDistance;
        
        if (isUpSwipe) {
            console.log("Swipe detected");
            onUnlock?.();
        }
    };

    return (
        <div 
            className={styles.screenContent}
            onTouchStart={onTouchStart}
            onClick={onUnlock}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className={styles.wallpaperContainer}>
                <Image
                    src={wallpaperImage}
                    alt="Wallpaper"
                    fill
                    priority
                    sizes="100vw"
                    className={styles.wallpaper}
                />
            </div>
            <StatusBar />
            <div className={styles.timeContainer}>
                <div className={styles.date}>{date}</div>
                <div className={styles.time}>{time}</div>
            </div>

            <div className={styles.nowPlaying}>
                <div className={styles.nowPlayingContent}>
                    <div className={styles.cover}>
                        <Image src={books[3].coverImage} alt={books[3].title} fill />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.source}>Joyner Audio</div>
                        <div className={styles.title}>{books[3].title}</div>
                        <div className={styles.author}>{books[3].author}</div>
                    </div>
                </div>
            </div>


            <div className={styles.actionButtons}>  
                <div className={styles.actionButton}>
                    <div className={styles.icon}>
                        <IoIosFlashlight />
                    </div>
                </div>
                <div className={styles.actionButton}>
                    <div className={styles.icon}>
                        <IoIosCamera />
                    </div>
                </div>
            </div>
            <div className={styles.swipeHint}></div>
        </div>
    );
};

export default LockScreen;