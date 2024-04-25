import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm/entities/Todo';
import { TodoDetailsParams } from 'src/typeorm/types/TodoDetailsParams';
import { updatedDetailsParams } from 'src/typeorm/types/UpdatedDetailsParams';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>
    ){}

    createTodo(todoDetails: TodoDetailsParams){
        const todo =  this.todoRepository.create({
            ...todoDetails,
            createdAt: new Date().toString()
        });
       return this.todoRepository.save(todo);
    }
    getTodos(){
        return this.todoRepository.find();
    }
   async updateOne(id: number, updatedDetails: updatedDetailsParams){
        await this.todoRepository.update( id , {...updatedDetails})
        return this.todoRepository.findOne({where: { id: id.toString() }})
    }
    removeOne(id: number){
        return this.todoRepository.delete(id);
    }
}
