import { time } from 'console';
import { DateTime } from 'luxon'
import { makeAutoObservable } from "mobx";
import { interval, Subscription } from 'rxjs';
import { Completed, CompletedMessage, completedMessenger, startMessenger, tickMessenger } from './bus';

// const PomodoroInterval = 25 minutes
const PomodoroInterval = 25 * 60

class ObservableTimerStore {
    timeSeconds = 0
    running = false
    pomSeconds = PomodoroInterval

    observableTick = interval(1000)
    tickListener: Subscription

    taskId: number|null = null

    // This observable will be used as a sentinel
    // to indicate when a completed interval has ended
    // see this.completeTimer
    timerCompleted:number = 0

    private readonly newProperty = this;

    constructor() {
        makeAutoObservable(this)
        console.log('ObservableTimer constructed')
        this.tickListener = this.subscribeTimer()
    }

    now = DateTime.now

    setPomodoroInterval = (seconds:number) => {
        this.pomSeconds = seconds
    }

    checkComplete = () => {
        if (this.timeSeconds <= 0) {
            completedMessenger.next(this.taskId!)
            this.running = false
        }

    }
    
    updateTick = (i:number) => {
        if (this.running) {
            this.timeSeconds--
            this.checkComplete()
        }
    }

    subscribeTimer = ():Subscription => {
        return this.tickListener || this.observableTick.subscribe(this.updateTick);
    }

    setTimeSeconds = (value:number) => { this.timeSeconds = value }
    start = (taskId:number) => {
        this.taskId = taskId
        this.setTimeSeconds(this.pomSeconds)
        this.running = true
    }
    
    startListener = startMessenger.subscribe(this.start)

    togglePause = () => {
        if(this.tickListener) {
            this.tickListener.unsubscribe()
            return;
        }
        if(this.timeSeconds > 0) {
            this.subscribeTimer()
        }
    }

}

export const timerStore = new ObservableTimerStore()


