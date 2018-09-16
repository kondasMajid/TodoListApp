import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  //placeholder for last id's so we can simulate automatic increments of id's
  lastId = 0;

  //placeholder for todo's
  todos: Todo[] = [];

  constructor() { }

  //to simulate Post/todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  //to Delete /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  //update todos/:id
  updateTodoById(id: number, values: object = {}): TodoDataService {
    const todo = this.getTodoById(id);
    if (!todo) {
      return this;
    }
    Object.assign(todo, values);
    return todo;
  }

  //get all todos
  getAllTodos(): Todo[] {
    return this.todos;
  }


  //get /todos/:id
  getTodoById(id: number): Todo | any {
    return this.todos
      .filter(todo => todo.category === id)
      .pop();
  }
  getTodoByCategory(id: number): Todo[] {
    return this.todos.filter(todo => todo.category === id);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}


