import styles from '@/styles/Library.module.scss';
import BookCarousel from './BookCarousel';
import { books } from '@/data/books';
import { useAudio } from '@/context/AudioContext';

const Library = () => {
    const { currentBook } = useAudio();
    
    // Filter books for different sections
    const currentlyReading = books.slice(0,2);
    const otherBooks = books.slice(2,4);

    return (
        <div className={styles.library}>
            <h2>My Library</h2>

            <hr/>
            
            <div className={styles.section}>
                <h3>Continue Listening</h3>
                <BookCarousel books={currentlyReading} />
            </div>

            <div className={styles.section}>
                <h3>Begin Listening</h3>
                <BookCarousel books={otherBooks} />
            </div>
        </div>
    );
};

export default Library;
