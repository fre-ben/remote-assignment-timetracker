import { useEffect, useState } from "react";
import { Task } from "../../server/db";
import { fetchTasks, fetchTasksByDescription, postTask } from "../../utils/api";
import { convertMsToTime, getDate, getTime } from "../../utils/time";
import Counter from "./Counter";
import styles from "./TimeTracker.module.css";

function TimeTracker() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(Date.now());
  const [timerTotal, setTimerTotal] = useState<number>(0);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskSearch, setTaskSearch] = useState<string>("");

  useEffect(() => {
    async function fetchAndSetTasks() {
      const tasks = await fetchTasks();
      setTaskList(tasks);
    }
    fetchAndSetTasks();
  }, []);

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

  async function handleTaskSubmit(event) {
    event.preventDefault();
    if (timerTotal === 0) {
      const newTask: Task = {
        description: taskDescription,
        elapsedTime: convertMsToTime(Date.now() - timerStart),
        date: getDate(),
        time: getTime(),
      };

      postTask(newTask);
      setTaskDescription("");
    } else {
      const newTask: Task = {
        description: taskDescription,
        elapsedTime: convertMsToTime(timerTotal),
        date: getDate(),
        time: getTime(),
      };

      postTask(newTask);
      setTaskDescription("");
      setTimerRunning(false);
      setTimerTotal(0);
    }
    const tasks = await fetchTasks();
    setTaskList(tasks);
    console.log(tasks);
  }

  async function handleSearchQuery(event, taskSearch) {
    event.preventDefault();
    const tasks = await fetchTasksByDescription(taskSearch);
    setTaskList(tasks);
    setTaskSearch("");
  }

  function displayTaskList(taskList: Task[]) {
    return taskList.map((task: Task) => {
      return (
        <li key={JSON.stringify(task.id)}>
          <p>{`Description: ${task.description}`}</p>
          <p>{`Time elapsed: ${task.elapsedTime}`}</p>
          <p>{`Date finished: ${task.date} at ${task.time}`}</p>
        </li>
      );
    });
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
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            required
          />
        </label>
        <button>Submit task</button>
      </form>
      <form
        className={styles.formContainer}
        onSubmit={(event) => handleSearchQuery(event, taskSearch)}
      >
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="Search previous tasks"
            value={taskSearch}
            onChange={(event) => setTaskSearch(event.target.value)}
          ></input>
          <button>Search!</button>
        </label>
      </form>
      <ul>{displayTaskList(taskList)}</ul>
    </div>
  );
}

export default TimeTracker;
