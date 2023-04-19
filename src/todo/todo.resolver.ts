import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, StatusArgs,UpdateTodoInput } from './dto';
import { AggregationsType } from './types/aggregations.type';


@Resolver( ()=> Todo)
export class TodoResolver {

  constructor(
    private readonly todoService:TodoService,
  ){}

  //@Query son para las consultas
  @Query( ()=> [Todo], {name: 'todos'})
  findAll(
    @Args() statusArgs:StatusArgs
  ):Todo[]{
    return this.todoService.findAll(statusArgs)
  }
  
  @Query( ()=> Todo, { name: 'todo'})
  findOne( 
    @Args('id', { type: ()=> Int})  id: number
  ):Todo{
    return this.todoService.findOne(id)
  }

  //@Mutation son para mutar o cambiar la data
  @Mutation( ()=> Todo, { name: 'CreateTodo'})
  createTodo(
    @Args( 'createTodoInput') createTodoInput: CreateTodoInput
  ):Todo{
    return this.todoService.create( createTodoInput)
  }

  @Mutation( ()=> Todo, { name: 'UpdateTodo'})
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ):Todo{
    return this.todoService.update(updateTodoInput)
  }

  @Mutation( ()=> String, { name: 'deleteTodo'})
  deleteTodo(
    @Args('id', { type: ()=> Int})  id: number
  ): string {
    return this.todoService.delete(id);
  }

  //Agragations
  @Query( ()=> Int, { name: 'totalTodos'})
  totalTodos():number{
    return this.todoService.totalTodos;
  }

  @Query( ()=> Int, { name: 'completedTodos'})
  completedTodos():number{
    return this.todoService.completedTodos;
  }
  
  @Query( ()=> Int, { name: 'pendingTodos'})
  pendingTodos():number{
    return this.todoService.pendingTodos;
  }

  @Query( ()=> AggregationsType, { name: 'statusTodos'} )
  aggregations(): AggregationsType{
    return{
      total: this.todoService.totalTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos
    }
  }

}
