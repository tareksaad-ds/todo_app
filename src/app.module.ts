import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './typeorm/entities/Todo';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tokyosuarez3093',
      database: 'todo_db',
      synchronize: true,
      entities: [Todo, User]
    }),
    TodosModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
