import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}