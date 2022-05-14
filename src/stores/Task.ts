import { DateTime } from "luxon"
import { BehaviorSubject } from "rxjs"

console.log({DateTime})
export class Task {
    id: number = DateTime.now().toMillis()
    name: String
    startDate: DateTime = DateTime.now()
    endDate: DateTime|null = null
    constructor(name:string, id?:number, startDate?:DateTime, endDate?:DateTime) {
        this.name = name
        if (id) this.id = id
        if (startDate) this.startDate = startDate
        if (endDate) this.endDate = endDate
    }

    static fromJson = (json:any):Task => {
        console.log("task fromJson", json)
        const startDate = DateTime.fromISO(json.startDate)
        const endDate = DateTime.fromISO(json.endDate)
        return (new Task(json.name, json.id, startDate, endDate))
    } 
}
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