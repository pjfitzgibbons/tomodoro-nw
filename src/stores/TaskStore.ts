import { keyBy } from "lodash"
import { BehaviorSubject } from "rxjs"
import { Task } from "../database/entities/Task"
import { taskRepo } from "../database/repositories/TaskRepo"
export class TaskNotFoundError {}

export type TaskMap = {[key: number]:Task}

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

    addTask(name:string) {
        const task = new Task({name})
        taskRepo.insert(task)

        console.log("addTask", task)
        this.emitTaskUpdate(task)
        return task.id
    }

    async completeTask(taskId:number) {
        const task = this.mappedList[taskId]
        if (!task) {
            console.error("Task not found for taskID ", taskId)
            return
        }

        task.endDate = new Date()

        taskRepo.updateDoc(task)
        this.emitTaskUpdate(task)
    }

    emitTaskUpdate(task:Task) {
        this.mappedList[task.id] = task
        this.tasks.next(this.mappedList)
    }

}

export const taskStore = new ObservableTaskStore()