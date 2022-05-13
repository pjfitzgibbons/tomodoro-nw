import { action, autorun, computed, makeObservable, observable } from "mobx";

export class Todo {
    constructor(
        public task: string = '',
        public completed: boolean = false,
        public asignee: string = ''
    ) {}
}

class ObservableTodoStore {
    todos: Todo[] = [];
    pendingRequests = 0;
  
    constructor() {
      makeObservable(this, {
        todos: observable,
        pendingRequests: observable,
        completedTodosCount: computed,
        report: computed,
        addTodo: action,
      });
    }
  
    get completedTodosCount() {
      return this.todos.filter(
        (todo:Todo) => todo.completed === true
      ).length;
    }
  
    get report() {
      if (this.todos.length === 0)
        return "<none>";
      const nextTodo = this.todos.find(todo => todo.completed === false);
      return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
        `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }
  
    addTodo(task:string) {
      this.todos.push(new Todo(task, false, ''))
    }
  }
  
  export const todoStore = new ObservableTodoStore();
                          