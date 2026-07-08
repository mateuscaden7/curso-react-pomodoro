import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./Countdown.module.css"

export function Countdown() {
    const { state } = useTaskContext();

    return (
        <>
            <div className={styles.countdown}>
                { state.formattedSecondsRemaining }
            </div>
        </>
    )
}