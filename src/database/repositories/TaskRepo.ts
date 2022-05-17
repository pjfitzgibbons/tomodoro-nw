import Datastore from '@seald-io/nedb'
import type { Task } from '../entities/Task'
import AppRepo from '../AppRepo'

export class TaskRepo extends AppRepo {
    datastore = (collectionName:string) => new Datastore<Task>(this.datastoreOpts(collectionName))

    // bindValue = (value:any) => new Task(value)

    db: Datastore<Task>;

    constructor(collectionName:string) {
        super()
        this.db = this.datastore(collectionName)
    }

}

export const taskRepo = new TaskRepo('tasks.db')
