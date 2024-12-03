import atomicHabitsImage from '@/images/atomichabits.jpg';
import narniaImage from '@/images/lionwitchwardrobe.jpg';
import hobbitImage from '@/images/thehobbit.jpg';
import lotrImage from '@/images/lordoftherings.jpg';

export const books = [
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        audioSrc: '/hci/audio/atomichabits.mp3',
        coverImage: atomicHabitsImage,
        chapters: [
            { title: 'The Fundamentals', timestamp: 0 },
            { title: 'The Surprising Power of Atomic Habits', timestamp: 60 },
            { title: 'How Habits Shape Your Identity', timestamp: 120 },
            { title: 'The Four Laws of Behavior Change', timestamp: 180 },
            { title: 'The First Law: Make it Obvious', timestamp: 240 }
        ]
    },
    {
        id: 'narnia',
        title: 'The Lion, the Witch, and the Wardrobe',
        author: 'C.S. Lewis',
        audioSrc: '/hci/audio/lionwitchandwardrobe.mp3',
        coverImage: narniaImage,
        chapters: [
            { title: 'Lucy Looks into a Wardrobe', timestamp: 0 },
            { title: 'What Lucy Found There', timestamp: 60 },
            { title: 'Edmund and the Wardrobe', timestamp: 120 },
            { title: 'Turkish Delight', timestamp: 180 },
            { title: 'Back on This Side of the Door', timestamp: 240 }
        ]
    },
    {
        id: 'hobbit',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        audioSrc: '/hci/audio/thehobbit.mp3',
        coverImage: hobbitImage,
        chapters: [
            { title: 'An Unexpected Party', timestamp: 0 },
            { title: 'Gandalf Visits', timestamp: 60 },
            { title: 'The Arrival of Dwarves', timestamp: 120 },
            { title: 'Thorin\'s Tale', timestamp: 180 },
            { title: 'The Journey Begins', timestamp: 240 }
        ]
    },
    {
        id: 'lotr',
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        author: 'J.R.R. Tolkien',
        audioSrc: '/hci/audio/lordoftherings.mp3',
        coverImage: lotrImage,
        chapters: [
            { title: 'A Long-expected Party', timestamp: 0 },
            { title: 'The Shadow of the Past', timestamp: 60 },
            { title: 'Three is Company', timestamp: 120 },
            { title: 'A Short Cut to Mushrooms', timestamp: 180 },
            { title: 'A Conspiracy Unmasked', timestamp: 240 }
        ]
    }
];

export const getBookById = (id) => books.find(book => book.id === id); 