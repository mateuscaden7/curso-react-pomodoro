import { useEffect, useReducer, useRef } from "react";
import { TaskContext } from ".";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storedState = localStorage.getItem('state');

        if (!storedState) return initialTaskState;

        const parsedStorage = JSON.parse(storedState) as TaskStateModel;

        return {
            ...parsedStorage,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    useEffect(() => {
        const worker = TimerWorkerManager.getInstance();

        worker.onmessage(e => {
            const countDownSeconds = e.data;

            if (countDownSeconds <= 0) {
                if (playBeepRef.current) {
                    playBeepRef.current();
                    playBeepRef.current = null;
                }

                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
                worker.terminate();
                return;
            }

            dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } });
        })

        if (!state.activeTask) {
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - Pomodoro`

        worker.postMessage(state);

        localStorage.setItem('state', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            { children }
        </TaskContext.Provider>
    )
}