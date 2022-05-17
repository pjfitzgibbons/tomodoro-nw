import { EntityBase } from "./EntityBase"
export class Task extends EntityBase {
    id: number = (new Date()).getTime()
    name: string
    startDate: Date = new Date()
    endDate: Date|null = null

    constructor({name}:{name:string}) {
        super({name})
        this.name = name
    }

    static bindValue = (value:any):Task => { return new (Task.bind(value))(value) }
}