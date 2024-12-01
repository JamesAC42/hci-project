import { useState, useRef } from 'react';
import styles from '@/styles/Card.module.scss';
import Playback from './Playback';
import Library from './Library';
import Navigation from './Navigation';
import { SiChatwoot } from "react-icons/si";

import { IoIosArrowDown  } from "react-icons/io";

const Card = () => {
    const [currentView, setCurrentView] = useState('playback');
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startX, setStartX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);
    const cardRef = useRef(null);

    const handleTouchStart = (e) => {
        const target = e.target;
        if (target.closest(`.${styles.progressBar}`) || target.closest(`.${styles.scrubber}`)) {
            return;
        }

        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const deltaY = currentY - startY;
        const deltaX = currentX - startX;

        // If card is minimized, only allow upward movement
        if (isMinimized && deltaY > 0) return;
        // If card is maximized, only allow downward movement
        if (!isMinimized && deltaY < 0) return;

        // If moving more horizontally than vertically and card is maximized
        if (Math.abs(deltaX) > Math.abs(deltaY) && !isMinimized) {
            // Allow horizontal movement
            e.preventDefault();
            setOffsetX(deltaX);
        } else {
            setOffsetY(deltaY);
        }
    };

    const handleHorizontalSwipe = () => {
        const threshold = 50;
        
        if (Math.abs(offsetX) < threshold) return;

        if (offsetX > 0) {
            // Swipe right
            switch (currentView) {
                case 'playback':
                    setCurrentView('library');
                    break;
                case 'navigation':
                    setCurrentView('playback');
                    break;
            }
        } else if (offsetX < 0) {
            // Swipe left
            switch (currentView) {
                case 'library':
                    setCurrentView('playback');
                    break;
                case 'playback':
                    setCurrentView('navigation');
                    break;
            }
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (Math.abs(offsetY) > 100) {
            setIsMinimized(offsetY > 0);
        }
        handleHorizontalSwipe();
        setOffsetY(0);
        setOffsetX(0);
    };

    const getTransform = () => {
        if (isDragging) {
            return `translateY(${offsetY}px)`;
        }
        return isMinimized ? 'translateY(calc(100% - 80px))' : 'translateY(0)';
    };

    const getViewTransform = () => {
        let transform;
        switch (currentView) {
            case 'library':
                transform = 0;
                break;
            case 'playback':
                transform = -33.33;
                break;
            case 'navigation':
                transform = -66.66;
                break;
            default:
                transform = -33.33;
        }
        
        if (isDragging) {
            transform += (offsetX / cardRef.current?.clientWidth) * 100;
        }
        
        return `translateX(${transform}%)`;
    };

    return (
        <div 
            ref={cardRef}
            className={`${styles.card} ${isMinimized ? styles.minimized : ''}`}
            style={{ transform: getTransform() }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className={styles.pullBar}>
                <div className={styles.indicator}>
                    <IoIosArrowDown  />
                </div>
            </div>

            {!isMinimized && (
                <div className={styles.chatBubble}>
                    <SiChatwoot />
                </div>
            )}

            <div className={styles.content}>
                <div 
                    className={styles.views} 
                    style={{
                        transform: getViewTransform()
                    }}
                >
                    <div className={styles.view}><Library /></div>
                    <div className={styles.view}><Playback /></div>
                    <div className={styles.view}><Navigation /></div>
                </div>
            </div>

            <div className={styles.pageIndicator}>
                <div onClick={() => setCurrentView('library')} className={`${styles.dot} ${currentView === 'library' ? styles.active : ''}`} />
                <div onClick={() => setCurrentView('playback')} className={`${styles.dot} ${currentView === 'playback' ? styles.active : ''}`} />
                <div onClick={() => setCurrentView('navigation')} className={`${styles.dot} ${currentView === 'navigation' ? styles.active : ''}`} />
            </div>
        </div>
    );
};

export default Card;
