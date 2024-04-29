import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./Todo";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    createdAt: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]
}