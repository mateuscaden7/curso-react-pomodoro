import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './Cycles.module.css'

export function Cycles() {
    const { state } = useTaskContext();

    const steps = Array.from({ length: state.currentCycle });

    return (
        <div className={styles.cycles}>
            <span className={styles.cycleText}>Cycles</span>
            
            <div className={styles.cyclesDots}>
                {
                    steps.map((_, index) => {
                        return <span 
                            key={`${getNextCycleType(index + 1)}_${index}`}
                            className={`${styles.cyclesDot} ${styles[getNextCycleType(index + 1)]}`}
                            aria-label='Indicador de Foco'
                            title='Indicador de Foco'
                        ></span>
                    })
                }
            </div>
        </div>
    )
}