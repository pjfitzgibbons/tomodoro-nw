import { taskStore } from "./TaskStore"
import { timerStore } from "./Timer"


class TaskTimerStore {

    taskId = 0
    constructor() {
        timerStore.completedObservable.subscribe(this.completedListener)
    }

    completedListener = () => {
        if (this.taskId > 0) {
            taskStore.completeTask(this.taskId)
        }
    }

    startNewTimer = (name: string) => {
        this.taskId = taskStore.addTask(name)
        timerStore.start()
    }

    togglePause = () => {
        if (this.taskId === 0) return

        timerStore.togglePause()
    }
}

export const taskTimerStore = new TaskTimerStore()