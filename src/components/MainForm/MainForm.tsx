import { PlayCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { LabelInput } from "../LabelInput"
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const { state, setState } = useTaskContext();

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

        const secondsRemaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: `${(Math.trunc(secondsRemaining / 60).toString().padStart(2, '0'))}:${((secondsRemaining % 60).toString().padStart(2, '0'))}`,
                tasks: [
                    ...prevState.tasks,
                    newTask
                ]
            }
        });
    }

    return (
        <form onSubmit={handleCreateNewTask} className="form" action="">
            <div className="formRow">
                <LabelInput 
                    topLabel="Task" 
                    placeholder="Digite algo..." 
                    id="inputTask"
                    ref={taskNameInput}
                />
            </div>

            <div className="formRow">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="formRow">
                <Cycles />
            </div>

            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} color="red" />
            </div>
        </form>
    )
}