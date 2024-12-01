import styles from "@/styles/MainScreen.module.scss";
import StatusBar from "@/components/StatusBar";
import Card from "@/components/main/Card";
import Discover from "@/components/main/Discover";

const MainScreen = () => {
    return (
        <div className={styles.mainScreen}>
            <div className={styles.content}>
                <Discover />
                <Card />
            </div>
        </div>
    );
};

export default MainScreen;