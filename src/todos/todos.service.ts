import { HttpException, Injectable } from '@nestjs/common';
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

    createTodo(todoDetails: TodoDetailsParams, user: any){
        const todo =  this.todoRepository.create({
            ...todoDetails,
            user: user,
            createdAt: new Date().toString(),
        });
       return this.todoRepository.save(todo);
    }
    getTodos(user: any){
        const id = user.id;
        try {
            return this.todoRepository.findBy({user: {id}}); 
        } catch (error) {
            return error;
        }
    }
   async updateOne(id: number, updatedDetails: updatedDetailsParams, user: any){
        const selectedTODO = await this.todoRepository.findBy({user: {id :user.id}, id: id.toString()})
        if(selectedTODO.length != 0){
            await this.todoRepository.update( id , {...updatedDetails})
            return this.todoRepository.findOne({where: { id: id.toString() }})
        }else{
            throw new HttpException('This Content does not belong to your user', 403)
        }
    }
    async removeOne(id: number, user: any){
        const userId = user.id;
        const todo = await this.todoRepository.findOne({where: {id: id.toString() ,user: {id: userId}}})
        if(todo){
            return this.todoRepository.delete(id);
        }else {
            throw new HttpException('This is Forbidden Action', 403)
        }
    }
}
