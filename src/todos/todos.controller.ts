import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from 'src/typeorm/dto/CreateTodoDto.dto';
import { UpdateTodoDto } from 'src/typeorm/dto/UpdateTodoDto.dto';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService){}

    @Get()
    getTodos(){
        return this.todoService.getTodos();
    }

    @Post()
    addTodo(@Body() createTodoDto: CreateTodoDto){
        return this.todoService.createTodo(createTodoDto);
    }

    @Put(':id')
    updateTodoById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateTodoDto: UpdateTodoDto
    ){
        return this.todoService.updateOne(id , {...updateTodoDto})
    }
    @Delete(':id')
    deleteTodoById(@Param('id', ParseIntPipe) id:number){
        return this.todoService.removeOne(id);
    }
}
