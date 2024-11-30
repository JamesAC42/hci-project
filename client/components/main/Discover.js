import styles from '@/styles/Discover.module.scss';
import BookCarousel from './BookCarousel';

const Discover = () => {
    return (
        <div className={styles.discover}>
            <h2>Discover</h2>
            
            <div className={styles.section}>
                <h3>For you</h3>
                <BookCarousel 
                    books={[
                        { title: 'Audio Book 1', author: 'Max Newman' },
                        { title: 'Audio Book 2', author: 'Bruce Wayne' },
                        { title: 'Audio Book 3', author: 'Test Test' }
                    ]}
                />
            </div>

            <div className={styles.section}>
                <h3>New Releases</h3>
                <BookCarousel 
                    books={[
                        { title: 'Audio Book 1', author: 'John Doe' },
                        { title: 'Audio Book 2', author: 'Bruce Wayne' },
                        { title: 'Audio Book 3', author: 'Test Test' }
                    ]}
                />
            </div>

            <div className={styles.section}>
                <h3>Based on your location</h3>
                <BookCarousel 
                    books={[
                        { title: 'Audio Book 1', author: 'Local Author' },
                        { title: 'Audio Book 2', author: 'Local Writer' },
                        { title: 'Audio Book 3', author: 'Regional Author' }
                    ]}
                />
            </div>
        </div>
    );
};

export default Discover;
