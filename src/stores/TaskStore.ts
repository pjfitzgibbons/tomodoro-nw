import { DateTime } from "luxon"
import { BehaviorSubject } from "rxjs"
import { Task } from "../database/entities/Task"

export class TaskNotFoundError {}

export type TaskMap = Map<number,Task>

class ObservableTaskStore {
    tasks = new BehaviorSubject<Task[]>([])

    constructor() {
        const tasksJson = window.localStorage.getItem('tomodoro_tasks')
        const taskList = JSON.parse(tasksJson!).map(Task.fromJson)
        this.tasks.next(taskList)
        this.tasks.subscribe(this.persistTasks)
    }
    private _tasks = () => this.tasks.getValue()

    addTask(name:string) {
        const task = new Task(name)
        this.tasks.next([...this._tasks(), task])
        return task.id
    }

    persistTasks = () => {
        console.log("persisting tasks")
        window.localStorage.setItem("tomodoro_tasks", JSON.stringify(this.tasks.getValue()))
    }

    /// findTask - retrieve task by id from `tasks`
    // :return: tuple of index, task - or [-1, TaskNotFoundError]
    findTask(taskId:number):[number, Task|TaskNotFoundError] {
        const tIdx = this._tasks().findIndex((t) => t.id === taskId)
        const task = this._tasks()[tIdx]
        if (tIdx >= 0) return [tIdx, task]

        return [-1, new TaskNotFoundError()]
    }

    completeTask(taskId:number) {
        const _localTasks:Task[] = this._tasks()
        const [tIdx, task] = this.findTask(taskId)
        if (task instanceof TaskNotFoundError) return

        task.endDate = DateTime.now()

        _localTasks[tIdx] = task
        this.tasks.next(_localTasks)
    }

}

export const taskStore = new ObservableTaskStore()