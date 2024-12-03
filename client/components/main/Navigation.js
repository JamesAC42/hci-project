import { useState } from 'react';
import styles from '@/styles/Navigation.module.scss';
import { useAudio } from '@/context/AudioContext';

const Navigation = () => {
    const [activeTab, setActiveTab] = useState('chapters');
    const { currentBook, skipToChapter, currentTime } = useAudio();

    const handleChapterClick = (index) => {
        skipToChapter(index);
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.navigation}>
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'chapters' ? styles.active : ''}`}
                    onClick={() => setActiveTab('chapters')}
                >
                    Chapters
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'bookmarks' ? styles.active : ''}`}
                    onClick={() => setActiveTab('bookmarks')}
                >
                    Bookmarks
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'chapters' && currentBook && (
                    <div className={styles.chapters}>
                        {currentBook.chapters.map((chapter, index) => (
                            <div 
                                key={index} 
                                className={`${styles.chapter} ${
                                    currentTime >= chapter.timestamp ? styles.past : ''
                                }`}
                                onClick={() => handleChapterClick(index)}
                            >
                                <div className={styles.chapterInfo}>
                                    <h4>{chapter.title}</h4>
                                    <span>{formatDuration(chapter.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {activeTab === 'bookmarks' && (
                    <div className={styles.bookmarks}>
                        <p className={styles.empty}>No bookmarks yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;
