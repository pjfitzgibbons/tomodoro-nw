import { DateTime } from "luxon"
import { makeAutoObservable } from "mobx"
import { CompletedMessage, completedMessenger } from "./bus"
import { ErrorInfo } from "react"
import { AnyCatcher } from "rxjs/internal/AnyCatcher"

export class Task {
    id: number = DateTime.now().toMillis()
    name: String
    startDate: DateTime = DateTime.now()
    endDate: DateTime|null = null
    constructor(name:string) {
        this.name = name
    }
}
class TaskNotFoundError {}

class ObservableTaskStore {
    tasks:Task[] = []
    
    constructor() {
        makeAutoObservable(this)
    }


    addTask(name:string) {
        const task = new Task(name)
        this.tasks.unshift(task)
        return task.id
    }

    findTask(taskId:number):Task|TaskNotFoundError {
        const task = this.tasks.find((t) => t.id == taskId)
        if (task) return task

        return new TaskNotFoundError()
    }
    setTaskComplete(taskId:number) {
        const taskFind = this.findTask(taskId)
        if (taskFind instanceof Task) {
                console.log(taskFind)
        } else {
                console.log("Task not found")
        }
    }
    taskCompleteUnsub = completedMessenger.subscribe(this.setTaskComplete)

}

export const taskStore = new ObservableTaskStore()