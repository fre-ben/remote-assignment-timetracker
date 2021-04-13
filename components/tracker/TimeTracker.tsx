import { useEffect, useState } from "react";
import styles from "./TimeTracker.module.css";

function TimeTracker() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(Date.now());
  const [timerTotal, setTimerTotal] = useState<number>(0);

  useEffect(() => {
    if (!timerRunning) {
      return;
    }
    const intervalID = setInterval(() => {
      setTimerTotal(Date.now() - timerStart);
    }, 100);
    return () => clearInterval(intervalID);
  }, [timerStart, timerRunning]);

  function startTimer() {
    setTimerStart(Date.now() - timerTotal);
    setTimerRunning(true);
  }

  function pauseTimer() {
    setTimerRunning(false);
  }

  function resetTimer() {
    setTimerRunning(false);
    setTimerStart(Date.now());
    setTimerTotal(0);
  }

  return (
    <div className={styles.container}>
      <h1>Time Tracker</h1>
      <div>Start: {timerStart}</div>
      <div>Total: {timerTotal}</div>
      <button onClick={timerRunning ? pauseTimer : startTimer}>
        {timerRunning ? `⏸` : `▶`}
      </button>
      <button onClick={resetTimer}>⏹</button>
    </div>
  );
}

export default TimeTracker;
