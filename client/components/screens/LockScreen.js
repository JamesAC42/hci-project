import { useState, useEffect } from 'react';
import styles from "@/styles/LockScreen.module.scss";
import StatusBar from "@/components/StatusBar";
import { IoIosFlashlight, IoIosCamera  } from "react-icons/io";

const LockScreen = ({ onUnlock }) => {
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
            <StatusBar />
            <div className={styles.timeContainer}>
                <div className={styles.date}>{date}</div>
                <div className={styles.time}>{time}</div>
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