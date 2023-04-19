import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {id: 1, description: 'Piedra del Alma', done: false},
    {id: 2, description: 'Piedra del Espacio', done: true},
    {id: 3, description: 'Piedra del Poder', done: false}
  ]; 

  get totalTodos(){
    return this.todos.length;
  }

  get completedTodos(){
    return this.todos.filter( todo => todo.done === true).length;
  }
  
  get pendingTodos(){
    return this.todos.filter( todo => todo.done === false).length;
  }

  findAll( statusArgs?: StatusArgs):Todo[]{
    
    let todos:Todo[]= this.todos;

    if ( statusArgs.status && statusArgs.status !== null )
      todos = todos.filter( todo => todo.done === statusArgs.status)
    
    if ( statusArgs.status === false)
      todos = todos.filter( todo => todo.done === statusArgs.status)
    
    return todos;
      
  }

  findOne( id: number):Todo{
    const todo= this.todos.find( todo => todo.id === id );
    if (!todo) throw new NotFoundException(`todo with id: ${id} not found`);
    return todo; 
  }

  create( createTodoInput:CreateTodoInput): Todo{
    const todo = new Todo();
    todo.description= createTodoInput.description;
    todo.id = Math.max( ...this.todos.map( todo => todo.id), 0 ) + 1;
    this.todos.push( todo );
    return todo;
  }

  update(updateTodoInput:UpdateTodoInput):Todo{
    const { id, description, done } = updateTodoInput;
    const todo = this.findOne(id);
    todo.description = description ? description: todo.description;
    todo.done =  done !== undefined ? done : todo.done;
    return todo;
  }

  delete( id: number){
    const todo = this.findOne(id);
    this.todos = this.todos.filter( ({ id }) => id !== todo.id);
    return `todo with id ${todo.id} deleted successfully`;
  }

}
