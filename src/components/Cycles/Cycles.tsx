import styles from './Cycles.module.css'

export function Cycles() {
    return (
        <div className={styles.cycles}>
            <span>Cycles</span>
            
            <div className={styles.cyclesDots}>
                <div className={`${styles.cyclesDot}`}></div>
                <div className={`${styles.cyclesDot} ${styles.workTime}`}></div>
            </div>
        </div>
    )
}