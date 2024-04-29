import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/typeorm/dto/CreateUserDto.dto';
import { UsersService } from './users.service';
import { LoginDTO } from 'src/typeorm/dto/LoginDataDto.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('register')
    registerUser(@Body() registerDto: CreateUserDto){
        return this.userService.createUser(registerDto);
    }
    @Post('login')
    async loginUser(@Body() loginDto: LoginDTO){
        return await this.userService.signinValidation(loginDto);
    }
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.removeUser(id);
    }
}
