import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

  
  @Query(()=> String , { description: 'Hello World es lo que retorna ', name: 'Alberto'})
  helloWorld():string{
    return "Hello World";
  }

  @Query( ()=> Float, { name: 'randomNnumber'})
  getRandomNumber():number{
    return Math.random() * 100;
  }

  @Query( ()=> Int, {name: 'randomInt', description: 'From zero to argument TO'})
  getRandomFromZeroTo( 
    @Args('to', { type: ()=> Int, nullable: true }) to: number = 6
  ): number{
    return Math.floor(Math.random() * to)
  }

}
