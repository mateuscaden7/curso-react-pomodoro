import type { TaskStateModel } from "../../models/TaskStateModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
    console.log("reducer");
    switch(action.type) {
        case TaskActionTypes.START_TASK:
            const secondsRemaining = action.payload.duration * 60;
            return {
                ...state,
                activeTask: action.payload,
                currentCycle: getNextCycle(state.currentCycle),
                secondsRemaining,
                formattedSecondsRemaining: `${(Math.trunc(secondsRemaining / 60).toString().padStart(2, '0'))}:${((secondsRemaining % 60).toString().padStart(2, '0'))}`,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            };
        case TaskActionTypes.INTERRUPT_TASK:
            //  setState(prevState => {
        //     return {
        //         ...prevState,
        //         activeTask: null,
        //         secondsRemaining: 0,
        //         formattedSecondsRemaining: '00:00',
        //         tasks: prevState.tasks.map(task => {
        //             if (prevState.activeTask?.id == task.id) {
        //                 return {
        //                     ...task,
        //                     interruptDate: Date.now()
        //                 }
        //             }
        //             return task;
        //         })
        //     }
        // });
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activeTask?.id == task.id) {
                        return {
                            ...task,
                            interruptDate: Date.now()
                        }
                    }
                    return task;
                })
            };
        case TaskActionTypes.RESET_TASK:
            return state;
    }

    return state;
}