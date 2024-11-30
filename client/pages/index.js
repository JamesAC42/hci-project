import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.scss";
import LockScreen from "@/components/screens/LockScreen";
import MainScreen from "@/components/screens/MainScreen";
import { useState } from "react";

const InterFont = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

const RubikFont = localFont({
  src: "./fonts/Rubik.ttf",
  variable: "--font-rubik",
  weight: "100 900",
});

export default function Home() {

  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
      <Head>
        <title>HCI Audiobook Prototype</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.screenOuter} ${RubikFont.variable}`}>
        <div className={styles.screenInner}>

          {isUnlocked ? <MainScreen /> : <LockScreen onUnlock={() => setIsUnlocked(true)} />}

        </div>
      </div>
    </>
  );
}
