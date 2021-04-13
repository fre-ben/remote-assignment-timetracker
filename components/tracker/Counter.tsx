import { convertMsToTime } from "../../utils/time";
import styles from "./Counter.module.css";

type CounterProps = {
  timerTotal: number;
};

function Counter({ timerTotal }: CounterProps) {
  return <div className={styles.container}>{convertMsToTime(timerTotal)}</div>;
}

export default Counter;
