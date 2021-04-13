import { useEffect, useState } from "react";
import { Task } from "../../server/db";
import { postTask } from "../../utils/api";
import { convertMsToTime, getDate, getTime } from "../../utils/time";
import Counter from "./Counter";
import styles from "./TimeTracker.module.css";

function TimeTracker() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(Date.now());
  const [timerTotal, setTimerTotal] = useState<number>(0);
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState([]);

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

  function handleTaskSubmit(event) {
    event.preventDefault();
    if (timerTotal === 0) {
      const newTask: Task = {
        task: taskName,
        elapsedTime: convertMsToTime(Date.now() - timerStart),
        date: getDate(),
        time: getTime(),
      };

      postTask(newTask);
      setTaskName("");
    } else {
      const newTask: Task = {
        task: taskName,
        elapsedTime: convertMsToTime(timerTotal),
        date: getDate(),
        time: getTime(),
      };

      postTask(newTask);
      setTaskName("");
      setTimerRunning(false);
      setTimerTotal(0);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Time Tracker</h1>
      <Counter timerTotal={timerTotal} />
      <div className={styles.buttonContainer}>
        <button onClick={timerRunning ? pauseTimer : startTimer}>
          {timerRunning ? `⏸` : `▶`}
        </button>
        <button onClick={resetTimer}>⏹</button>
      </div>
      <form className={styles.formContainer} onSubmit={handleTaskSubmit}>
        <label>
          Task:{" "}
          <input
            type="text"
            placeholder="Enter task"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            required
          />
        </label>
        <button>Submit task</button>
      </form>
    </div>
  );
}

export default TimeTracker;
