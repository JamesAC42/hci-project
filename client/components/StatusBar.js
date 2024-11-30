import styles from "@/styles/StatusBar.module.scss";
import { IoCellular } from "react-icons/io5";
import { IoIosWifi, IoIosBatteryFull  } from "react-icons/io";


const StatusBar = () => {
    return (
    <div className={styles.statusBar}>
        <div className={styles.left}>
            <div className={styles.provider}>AT&T</div>
        </div>
        <div className={styles.right}>
            <div className={styles.service}>
                <IoCellular />
            </div>
            <div className={styles.wifi}>
                <IoIosWifi />
            </div>
            <div className={styles.battery}>
                <IoIosBatteryFull />
            </div>
        </div>
    </div>
    );
}

export default StatusBar;
