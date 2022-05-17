import Datastore from '@seald-io/nedb'
import { Task } from '../entities/Task'
import AppRepo from '../AppRepo'

class TaskRepo extends AppRepo {
    datastore = () => new Datastore<Task>(this.datastoreOpts('tasks.db'))

    bindValue = (value:any) => new Task(value)

    db: Datastore<Task>;

    constructor() {
        super()
        this.db = this.datastore()
    }

    // serialize = (value:any):any => {
    //     // allow update to be a subdoc query
    //     if (!(value instanceof Task)) return value
    
    //     return {
    //         ...Object.assign({}, value),
    //         startDate: value.startDate.toMillis(),
    //         endDate: value.endDate ? value.endDate.toMillis() : null
    //     }
    // }

    deserialize = (value:any):Task => new Task(value)
    
}

export const taskRepo = new TaskRepo()
