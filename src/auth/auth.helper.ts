import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthHelper {
    constructor(private jwt: JwtService, private userService: UserService) {}

    public decode(accessToken: string) {
        return this.jwt.decode(accessToken, null);
    }

    public validateUser(decoded: { id: string }) {
        return this.userService.findOneById(decoded.id);
    }

    public generateToken(id: string): string {
        return this.jwt.sign({ id });
    }

    public isPasswordValid(password: string, userPassword: string) {
        if (!userPassword) {
            throw new HttpException(
                'Wrong password',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return bcrypt.compare(password, userPassword);
    }

    public async encodePassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}
