import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { LabelInput } from "../LabelInput"
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const { state, dispatch } = useTaskContext();

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return; 

        const taskName = taskNameInput.current.value.trim();

        if (taskName === "") {
            alert('Digite o nome da tarefa');
            return;
        }
        
        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            duration: state.config[nextCycleType],
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            type: nextCycleType
        }

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    }

    function handleInterruptTask() {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    }

    return (
        <form onSubmit={handleCreateNewTask} className="form" action="">
            <div className="formRow">
                <LabelInput 
                    topLabel="Task" 
                    placeholder="Digite algo..." 
                    id="inputTask"
                    ref={taskNameInput}
                    disabled={state.activeTask !== null}
                />
            </div>

            <div className="formRow">
                <p>O próximo intervalo é de {state.config[nextCycleType]}min</p>
            </div>

            {
                state.currentCycle !== 0 && (
                    <div className="formRow">
                        <Cycles />
                    </div>
                )
            }

            <div className="formRow">
                {
                    !state.activeTask ? (
                        <DefaultButton 
                            icon={<PlayCircleIcon />} 
                            key="startButton"
                            color="green" 
                            aria-label="Iniciar nova tarefa"
                            title="Iniciar nova tarefa"
                        />
                    ) : (
                        <DefaultButton 
                            icon={<StopCircleIcon />}
                            key="stopButton" 
                            color="red" 
                            aria-label="Parar tarefa"
                            title="Parar tarefa"
                            type="button"
                            onClick={handleInterruptTask}
                        />
                    )
                }
            </div>
        </form>
    )
}