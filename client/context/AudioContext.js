import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { books, getBookById } from '@/data/books';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [error, setError] = useState(null);
    const [currentBook, setCurrentBook] = useState(books[3]);
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentBook && !audioRef.current) {
            initializeAudio(currentBook.id);
        }
    }, []);

    useEffect(() => {
        if (!currentBook || !currentTime) return;

        const newChapterIndex = currentBook.chapters.findIndex((chapter, index) => {
            const nextChapter = currentBook.chapters[index + 1];
            if (!nextChapter) return true; // Last chapter
            return currentTime >= chapter.timestamp && currentTime < nextChapter.timestamp;
        });

        if (newChapterIndex !== -1 && newChapterIndex !== currentChapter) {
            setCurrentChapter(newChapterIndex);
        }
    }, [currentTime, currentBook]);

    const initializeAudio = (bookId) => {
        const book = getBookById(bookId);
        if (!book) return;

        try {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
            }

            const audio = new Audio(book.audioSrc);
            
            audio.onerror = (e) => {
                console.error('Audio loading error:', e);
                setError('Failed to load audio file');
            };

            audio.onloadstart = () => {
                console.log('Audio started loading');
            };

            audio.oncanplay = () => {
                console.log('Audio can start playing');
            };

            audio.addEventListener('loadedmetadata', () => {
                console.log('Metadata loaded, duration:', audio.duration);
                setDuration(audio.duration);
            });

            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime);
            });

            audioRef.current = audio;
            setCurrentBook(book);
            setCurrentChapter(0);
            setCurrentTime(0);
        } catch (err) {
            console.error('Error initializing audio:', err);
            setError(err.message);
        }
    };

    const playAudio = async (bookId) => {
        try {
            const targetBookId = bookId || currentBook?.id;
            
            if (!targetBookId) {
                throw new Error('No book selected');
            }

            if (bookId && (!currentBook || currentBook.id !== bookId)) {
                initializeAudio(bookId);
            } else if (!audioRef.current) {
                initializeAudio(targetBookId);
            }
            
            console.log('Attempting to play audio...');
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                await playPromise;
                console.log('Audio playing successfully');
                setIsPlaying(true);
            }
        } catch (err) {
            console.error('Error playing audio:', err);
            setError(err.message);
            setIsPlaying(false);
        }
    };

    const pauseAudio = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
    };

    const seekTo = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const skipToChapter = (chapterIndex) => {
        if (currentBook && currentBook.chapters[chapterIndex]) {
            seekTo(currentBook.chapters[chapterIndex].timestamp);
            setCurrentChapter(chapterIndex);
        }
    };

    const rewind30 = () => {
        if (audioRef.current) {
            const newTime = Math.max(0, audioRef.current.currentTime - 30);
            seekTo(newTime);
        }
    };

    const skipAhead30 = () => {
        if (audioRef.current) {
            const newTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 30);
            seekTo(newTime);
        }
    };

    const value = {
        isPlaying,
        currentTime,
        duration,
        currentChapter,
        currentBook,
        error,
        playAudio,
        pauseAudio,
        seekTo,
        skipToChapter,
        rewind30,
        skipAhead30,
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}; 