import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'todos'})
export class Todo {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isFinished: boolean;

    @Column()
    createdAt: string;
    
    @ManyToOne(() => User , (user) => user.todos)
    user: User
}