import styles from '@/styles/BookCarousel.module.scss';
import BookItem from './BookItem';

const BookCarousel = ({ books }) => {
    return (
        <div className={styles.carousel}>
            {books.map((book, index) => (
                <BookItem key={index} {...book} />
            ))}
        </div>
    );
};

export default BookCarousel;
