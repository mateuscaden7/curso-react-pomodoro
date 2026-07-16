import { useEffect, useReducer } from "react";
import { TaskContext } from ".";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);

    useEffect(() => {
        const worker = TimerWorkerManager.getInstance();

        worker.onmessage(e => {
            const countDownSeconds = e.data;
            console.log(countDownSeconds);

            if (countDownSeconds <= 0) {
                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
                worker.terminate();
                return;
            }

            dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } });
        })

        if (!state.activeTask) {
            console.log('Worker terminado por falta de activeTask');
            worker.terminate();
        }

        worker.postMessage(state);
  }, [state]);

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            { children }
        </TaskContext.Provider>
    )
}