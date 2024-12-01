import styles from '@/styles/Playback.module.scss';
import { IoPlayCircle, IoPauseCircle, IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { IoBookmarkOutline } from "react-icons/io5";
import { TbRewindBackward30 } from "react-icons/tb";
import { useState, useRef } from 'react';

const Playback = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(30); // percentage
    const progressBarRef = useRef(null);
    const isDraggingRef = useRef(false);

    const totalDuration = 23 * 60; // 23 minutes in seconds
    
    const formatTime = (seconds) => {
        const remainingSeconds = Math.floor((totalDuration * (100 - progress)) / 100);
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        return `-${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgressBarClick = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const newProgress = (clickPosition / rect.width) * 100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    const handleScrubberMouseDown = (e) => {
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const movePosition = e.clientX - rect.left;
        const newProgress = (movePosition / rect.width) * 100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleProgressBarTouch = (e) => {
        e.stopPropagation(); // Prevent the card from handling this touch
        const rect = progressBarRef.current.getBoundingClientRect();
        const touchPosition = e.touches[0].clientX - rect.left;
        const newProgress = (touchPosition / rect.width) * 100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    const handleScrubberTouchStart = (e) => {
        e.stopPropagation(); // Prevent the card from handling this touch
        isDraggingRef.current = true;
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e) => {
        e.stopPropagation(); // Prevent the card from handling this touch
        if (!isDraggingRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const movePosition = e.touches[0].clientX - rect.left;
        const newProgress = (movePosition / rect.width) * 100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    return (
        <div className={styles.playback}>
            <div className={styles.bookInfo}>
                <h1>1177 B.C: The Year Civilization Collapsed</h1>
                <p>Prologue: The Collapse of Civilizations: 1177 BC</p>
            </div>

            <div className={styles.buttons}>
                <button className={styles.skip}><IoPlaySkipBack /></button>
                <button className={styles.playPause} onClick={handlePlayPause}>
                    {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
                </button>
                <button className={styles.skip}><IoPlaySkipForward /></button>
            </div>
            <div className={styles.timeControl}>
                <span className={styles.time}>{formatTime()}</span>
                <div 
                    className={styles.progressBar} 
                    ref={progressBarRef}
                    onClick={handleProgressBarClick}
                    onTouchStart={handleProgressBarTouch}
                >
                    <div 
                        className={styles.progress}
                        style={{ width: `${progress}%` }}
                    >
                        <div 
                            className={styles.scrubber}
                            onMouseDown={handleScrubberMouseDown}
                            onTouchStart={handleScrubberTouchStart}
                        ></div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.speed}><TbRewindBackward30 /></button>
                <button className={styles.bookmark}><IoBookmarkOutline /></button>
            </div>
        </div>
    );
};

export default Playback;
