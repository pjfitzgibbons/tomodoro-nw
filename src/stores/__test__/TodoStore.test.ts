import { render, screen } from '@testing-library/react';
import { autorun } from 'mobx';
import { Todo, todoStore } from '../TodoStore'

const aTodo = new Todo('task')
test('Todo entity', () => {
  const todo:Todo = aTodo
  expect(todo.task).toEqual('task')
  expect(todo.completed).toEqual(false)
  expect(todo.asignee).toEqual('')
});

test('TodoStore ', async () => {
  var watchCount = 0
  const todoWatcher = autorun(() => {
    watchCount++
  })
  expect(todoStore.todos.length).toBe(0)

  await todoStore.addTodo(aTodo.task)

  expect(todoStore.todos.length).toBe(1)
  expect(watchCount).toBe(1)
})
