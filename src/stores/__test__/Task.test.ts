import produce from "immer"
import { DateTime } from "luxon"
import { taskStore } from "../TaskStore"

beforeEach(() => {
})
test('Truthy', () => {
    expect(true).toBeTruthy()
})

const expectListCount = (num:number) => expect(taskStore.tasks.size).toEqual(num)

test('Add Task', () => {
    expectListCount(0)
    taskStore.addTask('test1')
    expectListCount(1)
    taskStore.addTask('test2')
    expectListCount(2)
})

test('Complete task', () => { 
    const taskId = taskStore.addTask('test')
    expect(taskStore.tasks.get(taskId)?.name).toEqual('test')
    expect(taskStore.tasks.get(taskId)?.endDate).toBeNull()

    taskStore.completeTask(taskId)
    expect(taskStore.tasks.get(taskId)?.endDate).toBeInstanceOf(DateTime)
})