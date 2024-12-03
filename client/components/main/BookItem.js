import styles from '@/styles/BookItem.module.scss';
import { useAudio } from '@/context/AudioContext';
import Image from 'next/image';

const BookItem = ({ id, title, author, coverImage }) => {
    const { playAudio, currentBook, isPlaying, pauseAudio } = useAudio();

    const handleClick = () => {
        if (currentBook?.id !== id) {
            playAudio(id);
        } else {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio(id);
            }
        }
    };

    const isCurrentlyPlaying = currentBook?.id === id && isPlaying;

    return (
        <div 
            className={`${styles.bookItem} ${isCurrentlyPlaying ? styles.playing : ''}`} 
            onClick={handleClick}
        >
            <div className={styles.cover}>
                <Image
                    src={coverImage}
                    alt={`Cover of ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
            <div className={styles.info}>
                <h4>{title}</h4>
                <p>By {author}</p>
            </div>
        </div>
    );
};

export default BookItem;
