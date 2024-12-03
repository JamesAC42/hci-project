import styles from "@/styles/MainScreen.module.scss";
import StatusBar from "@/components/StatusBar";
import Card from "@/components/main/Card";
import Discover from "@/components/main/Discover";
import { AudioProvider } from '@/context/AudioContext';

const MainScreen = () => {
    return (
        <AudioProvider>
            <div className={styles.mainScreen}>
                <div className={styles.content}>
                    <Discover />
                    <Card />
                </div>
            </div>
        </AudioProvider>
    );
};

export default MainScreen;