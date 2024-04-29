import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from 'src/typeorm/dto/CreateTodoDto.dto';
import { UpdateTodoDto } from 'src/typeorm/dto/UpdateTodoDto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    getTodos(@Req() req: Request){
        const user = req.user;
        return this.todoService.getTodos(user);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    addTodo(
        @Body() createTodoDto: CreateTodoDto,
        @Req() req: Request
    ){
        const user = req.user;
        return this.todoService.createTodo(createTodoDto, user);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateTodoById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req: Request
    ){
        const user = req.user;
        return this.todoService.updateOne(id , {...updateTodoDto}, user)
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteTodoById(
        @Param('id', ParseIntPipe) id:number,
        @Req() req: Request
    ){
        const user = req.user;
        return this.todoService.removeOne(id, user);
    }
}
