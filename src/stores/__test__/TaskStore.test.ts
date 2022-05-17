import produce from "immer"
import { size } from "lodash"
import { TaskMap, taskStore } from "../TaskStore"

beforeEach(() => {
})
test('Truthy', () => {
    expect(true).toBeTruthy()
})

const expectListCount = (num:number) => {
    const taskList:TaskMap = taskStore.tasks.getValue()
    expect(size(taskList)).toEqual(num)
} 

test('Add Task', async () => {
    expectListCount(0)
    await taskStore.addTask('test1')
    expectListCount(1)
    await taskStore.addTask('test2')
    expectListCount(2)
})

test('Complete task', async () => { 
    var result = await taskStore.addTask('test')
    var id:string = result!

    var tasks = taskStore.tasks.getValue()
    expect(tasks[id].name).toEqual('test')
    expect(tasks[id].endDate).toBeUndefined()

    taskStore.completeTask(id)
    var tasks = taskStore.tasks.getValue()

    expect(tasks[id].endDate).toBeInstanceOf(Date)
})