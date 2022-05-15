import { DateTime } from "luxon"
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('tasks')
export class Task {
    @PrimaryColumn()
    id: number = DateTime.now().toMillis()

    @Column()
    name: String

    static dateTimeTransformer = {from: (value:string) => value ? DateTime.fromISO(value) : null, to: (value:string|null) => value ? value.toString() : null}

    @Column({type: 'text', transformer: Task.dateTimeTransformer })
    startDate: DateTime = DateTime.now()

    @Column({type: 'text', transformer: Task.dateTimeTransformer })
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