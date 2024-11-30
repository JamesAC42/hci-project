import styles from '@/styles/Library.module.scss';
import BookCarousel from './BookCarousel';

const Library = () => {
    return (
        <div className={styles.library}>
            <h2>My Library</h2>
            
            <div className={styles.section}>
                <h3>Continue Listening</h3>
                <BookCarousel 
                    books={[
                        { title: 'Audio Book 1', author: 'Max Newman' },
                        { title: 'Audio Book 2', author: 'Bruce Wayne' }
                    ]}
                />
            </div>

            <div className={styles.section}>
                <h3>Begin Listening</h3>
                <BookCarousel 
                    books={[
                        { title: 'Audio Book 1', author: 'Max Newman' },
                        { title: 'Audio Book 2', author: 'Bruce Wayne' }
                    ]}
                />
            </div>
        </div>
    );
};

export default Library;
