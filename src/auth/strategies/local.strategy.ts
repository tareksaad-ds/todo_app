import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UsersService){
        super();
    }

    validate(email: string, password: string) {
        const user = this.userService.signinValidation({ email, password });
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}