import type { TaskModel } from "../models/TaskModel";

export type SortTasksOptions = {
    tasks: TaskModel[];
    direction?: "asc" | "desc";
    field?: keyof TaskModel;
};

export function sortTasks({ tasks = [], direction = "desc", field = "startDate" }: SortTasksOptions): TaskModel[] {
    return [...tasks].sort((a, b) => {
        // Validando null
        if (a[field] === null && b[field] === null) return 0;
        if (a[field] === null) return direction === "asc" ? -1 : 1;
        if (b[field] === null) return direction === "asc" ? 1 : -1;

        if (typeof a[field] === "number" && typeof b[field] === "number") {
            return direction === "asc" ?
                a[field] - b[field] :
                b[field] - a[field];
        }

        if (typeof a[field] === "string" && typeof b[field] === "string") {
            return direction === "asc" ?
                a[field].localeCompare(b[field]) :
                b[field].localeCompare(a[field]);
        }

        return 0;
    });
}