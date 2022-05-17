import { taskStore } from "./TaskStore"
import { timerStore } from "./Timer"


class TaskTimerStore {

    taskId = ''
    constructor() {
        timerStore.completedObservable.subscribe(this.completedListener)
    }

    completedListener = () => {
        if (this.taskId > '') {
            taskStore.completeTask(this.taskId)
        }
    }

    startNewTimer = async (name: string) => {
        this.taskId = (await taskStore.addTask(name))!
        timerStore.start()
    }

    togglePause = () => {
        if (this.taskId === '') return

        timerStore.togglePause()
    }
}

export const taskTimerStore = new TaskTimerStore()