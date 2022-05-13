// import { Omnibus } from 'omnibus-rxjs'
// import { Emitter } from '@mnasyrov/pubsub'

import { DateTime } from "luxon"
import { Subject } from "rxjs"

export class CompletedMessage {
    taskId: number
    endTime: number = DateTime.now().toMillis()
    constructor(taskId:number, endTime?:number) {
        this.taskId = taskId
        if (endTime) this.endTime = endTime
    }
}

export const startMessenger = new Subject<number>()
export const tickMessenger = new Subject<number>()
export const completedMessenger = new Subject<number>()

export class Completed {
    endTime:number
    constructor(endTime:number) {
        this.endTime = endTime
    }
}
export class Start {
    taskName:string
    constructor(taskName:string) { this.taskName = taskName }
}
export class Tick {
    seconds:number
    constructor(seconds:number) { this.seconds = seconds }
}

// export const completedMessenger = new Emitter<Completed>()
// export const startedMessenger = new Emitter<Start>()
// export const tickMessenger = new Emitter<Tick>()