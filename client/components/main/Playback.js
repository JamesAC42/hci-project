import styles from '@/styles/Playback.module.scss';
import { IoPlayCircle, IoPauseCircle, IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { IoBookmarkOutline } from "react-icons/io5";
import { TbRewindBackward30, TbRewindForward30 } from "react-icons/tb";
import { useState, useRef } from 'react';
import { useAudio } from '@/context/AudioContext';

const Playback = () => {
    const {
        isPlaying,
        currentTime,
        duration,
        playAudio,
        pauseAudio,
        seekTo,
        rewind30,
        skipAhead30,
        currentBook,
        currentChapter,
        skipToChapter
    } = useAudio();
    const progressBarRef = useRef(null);
    const isDraggingRef = useRef(false);

    const progress = (currentTime / duration) * 100;
    
    const formatTime = (seconds) => {
        const remainingSeconds = Math.floor(duration - currentTime);
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        return `-${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    const handleProgressBarClick = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const newProgress = (clickPosition / rect.width) * 100;
        const newTime = (newProgress / 100) * duration;
        seekTo(newTime);
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
        const newTime = (newProgress / 100) * duration;
        seekTo(newTime);
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
        const newTime = (newProgress / 100) * duration;
        seekTo(newTime);
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
        const newTime = (newProgress / 100) * duration;
        seekTo(newTime);
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    const handleSkipBack = () => {
        if (currentChapter > 0) {
            skipToChapter(currentChapter - 1);
        }
    };

    const handleSkipForward = () => {
        if (currentBook && currentChapter < currentBook.chapters.length - 1) {
            skipToChapter(currentChapter + 1);
        }
    };

    const handleRewind30 = () => {
        rewind30();
    };

    const handleSkipAhead30 = () => {
        skipAhead30();
    };

    return (
        <div className={styles.playback}>
            {currentBook ? (
                <div className={styles.bookInfo}>
                    <h1>{currentBook.title}</h1>
                    <p>{currentBook.chapters[currentChapter]?.title || 'Chapter 1'}</p>
                </div>
            ) : (
                <div className={styles.bookInfo}>
                    <h1>Loading...</h1>
                    <p>Please wait</p>
                </div>
            )}

            <div className={styles.buttons}>
                <button 
                    className={styles.skip} 
                    onClick={handleSkipBack}
                    disabled={currentChapter === 0}
                >
                    <IoPlaySkipBack />
                </button>
                <button className={styles.playPause} onClick={handlePlayPause}>
                    {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
                </button>
                <button 
                    className={styles.skip} 
                    onClick={handleSkipForward}
                    disabled={!currentBook || currentChapter === currentBook.chapters.length - 1}
                >
                    <IoPlaySkipForward />
                </button>
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
                <button 
                    className={styles.speed} 
                    onClick={handleRewind30}
                >
                    <TbRewindBackward30 />
                </button>
                <button className={styles.bookmark}>
                    <IoBookmarkOutline />
                </button>
                <button 
                    className={styles.speed} 
                    onClick={handleSkipAhead30}
                >
                    <TbRewindForward30 />
                </button>
            </div>
        </div>
    );
};

export default Playback;
