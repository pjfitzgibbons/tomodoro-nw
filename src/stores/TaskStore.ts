import { keyBy } from "lodash"
import { BehaviorSubject } from "rxjs"
import { Task } from "../database/entities/Task"
import { taskRepo } from "../database/repositories/TaskRepo"
export class TaskNotFoundError {}

export type TaskMap = {[key: string]:Task}

class ObservableTaskStore {
    tasks = new BehaviorSubject<TaskMap>({})
    mappedList:TaskMap = {}
    
    constructor() {
        (async () => {
            const taskList = await taskRepo.find()
            const mappedList = keyBy(taskList, 'id')
            this.tasks.next(mappedList)
        })()
        
    }
    private _tasks = () => this.tasks.getValue()

    async  addTask(name:string) {
        var task:Task = {name, startDate: new Date()}
        task = await taskRepo.insert(task)

        this.emitTaskUpdate(task)
        return task._id
    }

    async completeTask(taskId:string) {
        const task = this.mappedList[taskId]
        if (!task) {
            console.error("Task not found for taskID ", taskId)
            return
        }

        task.endDate = new Date()

        await taskRepo.updateDoc(task)
        this.emitTaskUpdate(task)
    }

    emitTaskUpdate(task:Task) {
        this.mappedList[task._id!] = task
        this.tasks.next(this.mappedList)
    }

}

export const taskStore = new ObservableTaskStore()