import styles from '@/styles/BookItem.module.scss';

const BookItem = ({ title, author }) => {
    return (
        <div className={styles.bookItem}>
            <div className={styles.cover}></div>
            <div className={styles.info}>
                <h4>{title}</h4>
                <p>By {author}</p>
            </div>
        </div>
    );
};

export default BookItem;
