import { useState } from 'react';
import styles from '@/styles/Navigation.module.scss';

const Navigation = () => {
    const [activeTab, setActiveTab] = useState('chapters');

    const chapters = [
        { title: 'Opening Credits', duration: '00:26' },
        { title: 'Preface', duration: '03:43' },
        { title: 'Acknowledgments', duration: '09:41' },
        { title: 'Prologue: The Collapse of Civilizations: 1177 BC', duration: '04:24' },
        { title: 'Chapter One: Act I: Of Arms and the Man: The Fifteenth Century BC', duration: '28:25' },
        { title: 'Chapter Two: Act II: An (Aegean) Affair to Remember: The Fourteenth Century BC', duration: '1:15:30' }
    ];

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
                {activeTab === 'chapters' && (
                    <div className={styles.chapters}>
                        {chapters.map((chapter, index) => (
                            <div key={index} className={styles.chapter}>
                                <div className={styles.chapterInfo}>
                                    <h4>{chapter.title}</h4>
                                    <span>{chapter.duration}</span>
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
