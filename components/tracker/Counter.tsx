import { convertMsToTime } from "../../utils/timeConverter";
import styles from "./Counter.module.css";

type CounterProps = {
  timerTotal: number;
};

function Counter({ timerTotal }: CounterProps) {
  return <div className={styles.container}>{convertMsToTime(timerTotal)}</div>;
}

export default Counter;
