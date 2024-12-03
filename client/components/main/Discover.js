import styles from '@/styles/Discover.module.scss';
import BookCarousel from './BookCarousel';
import { books } from '@/data/books';

const Discover = () => {
    // For demo purposes, we'll split the books into different categories
    const forYou = books.slice(0, 2);  // First two books
    const newReleases = books.slice(2); // Last two books
    const localBooks = [books[1], books[3]]; // Mix of books

    return (
        <div className={styles.discover}>
            <h2>Discover</h2>

            <hr/>
            
            <div className={styles.section}>
                <h3>For you</h3>
                <BookCarousel books={forYou} />
            </div>

            <div className={styles.section}>
                <h3>New Releases</h3>
                <BookCarousel books={newReleases} />
            </div>

            <div className={styles.section}>
                <h3>Based on your location</h3>
                <BookCarousel books={localBooks} />
            </div>
        </div>
    );
};

export default Discover;
