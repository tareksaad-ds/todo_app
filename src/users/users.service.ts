import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, encodePassword } from 'src/auth/bcrypt';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/typeorm/types/CreateUserParams';
import { LoginParams } from 'src/typeorm/types/LoginParams';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}
    async createUser(userDetails: CreateUserParams){
        const findUser = await this.userRepository.findOne({where: { email: userDetails.email }});
        if (!findUser){
            const hashedPassword = encodePassword(userDetails.password);
            const user = this.userRepository.create({
                ...userDetails,
                password: hashedPassword,
                createdAt: new Date().toString()
            });
            return this.userRepository.save(user);
        }else {
            throw new HttpException('Your email is already exist!', 409);
        }
    }
    async signinValidation({email, password}: LoginParams){
        const findUser = await this.userRepository.findOne({where: { email: email }});
        if(!findUser) throw new HttpException('Invalid Email', 409);
        const matched = comparePassword(password, findUser.password)
        if(matched){
            const { password , ...user} = findUser;
            return {
                "token": this.jwtService.sign(user)
            }
        }else{
            throw new HttpException('Invalid Password', 409);
        }
    }
    removeUser(id: number){
        return this.userRepository.delete(id);
    }
}
