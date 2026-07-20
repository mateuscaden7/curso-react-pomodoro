import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";
import styles from "./History.module.css";
import { Heading } from "../../components/Heading";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
    const { state, dispatch } = useTaskContext();
    const hasTasks = state.tasks.length > 0;
    const [ sortTasksOptions, setSortTasksOptions ] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            direction: "desc",
            field: "startDate"
        };
    });

    function handleSortTasks({field}: Pick<SortTasksOptions, "field">) {
        const newDirection = sortTasksOptions.direction === "asc" && sortTasksOptions.field === field ? "desc" : "asc";

        setSortTasksOptions({
            tasks: sortTasks({ tasks: state.tasks, direction: newDirection, field }),
            direction: newDirection,
            field
        });
    }

    function handleDeleteHistory() {
        if (!confirm("Tem certeza que deseja apagar o histórico?")) {
            return;
        }

        dispatch({ type: TaskActionTypes.RESET_TASK });
    }

    useEffect(() => {
        handleSortTasks({ field: sortTasksOptions.field });
    }, [state.tasks]);

    return (
        <>
            <MainTemplate>
                <Container>
                    <Heading>
                        <span>History</span>
                        <span className={styles.buttonContainer}>
                            <DefaultButton 
                                icon={<TrashIcon />} 
                                color="red" 
                                aria-label="Apagar histórico"
                                title="Apagar histórico"
                                onClick={handleDeleteHistory}
                            />
                        </span>
                    </Heading>
                </Container>

                <Container>
                    {hasTasks && (
                        <div className={styles.responsiveTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={styles.thSort} onClick={() => handleSortTasks({ field: "name" })}>Tarefa</th>
                                        <th className={styles.thSort} onClick={() => handleSortTasks({ field: "duration" })}>Duração</th>
                                        <th className={styles.thSort} onClick={() => handleSortTasks({ field: "startDate" })}>Data</th>
                                        <th>Status</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortTasksOptions.tasks.map((task) => {
                                        const workTypeMap = {
                                            "workTime": "Foco",
                                            "shortBreakTime": "Descanso curto",
                                            "longBreakTime": "Descanso longo"
                                        }

                                        return (
                                            <tr key={task.id}>
                                                <td>{task.name}</td>
                                                <td>{task.duration}min</td>
                                                <td>{formatDate(task.startDate)}</td>
                                                <td>{getTaskStatus(task, state.activeTask)}</td>
                                                <td>{workTypeMap[task.type]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {!hasTasks && (
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Ainda não existem tarefas registradas.</p>
                    )}
                </Container>
            </MainTemplate>
        </>
    )
}