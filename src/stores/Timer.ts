import { DateTime } from 'luxon'
import { interval, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { _markRemoved } from '../dev-extensions/react-devtools/build/parseSourceAndMetadata.worker.worker';

// const PomodoroInterval = 25 minutes
const PomodoroInterval = 25 * 60

class ObservableTimerStore {
    timeSeconds = 0
    running = false
    pomMilliSeconds = PomodoroInterval

    timerSource = interval(1000)

    // use to track time-delta from last timerSource event
    lastTick = DateTime.now().toMillis()

    tickListener: Subscription | null = null

    startTime: number = 0
    timeRemaining = new BehaviorSubject<number>(0)

    runningObservable = new BehaviorSubject<boolean>(true)

    completedObservable = new Subject<number>()

    timerSub: Subscription | null = null

    checkCountdown = () => {
        const nowMillis = DateTime.now().toMillis()
        const delta = nowMillis - this.lastTick
        var _remaining = this.timeRemaining.getValue()
        if (this.running) {
            _remaining -= delta
            if (_remaining < 0.0) {
                this.completedObservable.next(DateTime.now().toMillis())
                this.timeRemaining.next(0)
                this.running = false
            } else {
                this.timeRemaining.next(_remaining)
            }
        }
        this.lastTick = nowMillis

    }

    constructor() {
        this.pomMilliSeconds = PomodoroInterval * 1000
        this.tickListener = this.timerSource.subscribe(this.checkCountdown)
    }

    now = DateTime.now

    setPomodoroInterval = (seconds: number) => {
        this.pomMilliSeconds = seconds * 1000
    }


    start = () => {
        this.timeRemaining.next(this.pomMilliSeconds)
        this.running = true
    }

    togglePause = () => {
        console.log("togglePause", this.startTime, this.running)
        if (this.timeRemaining.getValue() <= 0) return

        this.running = !this.running
    }

}

export const timerStore:ObservableTimerStore = new ObservableTimerStore()
