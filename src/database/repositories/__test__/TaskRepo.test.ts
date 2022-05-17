import { assert } from "console"
import { Task } from "../../entities/Task"
import { TaskRepo } from "../TaskRepo"
import Datastore from '@seald-io/nedb'


var repo:TaskRepo

beforeEach(async () => {
    repo = new TaskRepo('') // in-mmeory only database
})
test('Add Task', async () => {
    const t:Task = {name:'test', startDate: new Date()}
    await repo.insert(t)
    expect(repo.db.getAllData().length).toEqual(1)
})
test('update task', async () => {
    var t:Task = {_id: 'testid234', name:'test', startDate: new Date()}
    const expectedId = t._id
    expect(t.endDate).toBeUndefined()

    const now = new Date()
    const inserted = await repo.insert(t)
    expect(inserted._id).toEqual(expectedId)
    t = await repo.findOne({_id: expectedId})
    expect(t._id).toEqual(expectedId)
    expect(t.name).toEqual('test')
    expect(t.endDate).toBeUndefined()

    t.name = 'updatedName'
    t.endDate = now
    const result = await repo.updateDoc(t)

    expect(result.numAffected).toEqual(1)
    t = await repo.findOne({_id: expectedId})
    expect(t.name).toEqual('updatedName')
    expect(t.endDate).toEqual(now)
})

