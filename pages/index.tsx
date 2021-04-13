import Head from "next/head";
import TimeTracker from "../components/tracker/TimeTracker";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Time Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TimeTracker />
      </main>
    </div>
  );
}
