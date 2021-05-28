import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from '../../config/app/env.type';
import type { User } from '@prisma/client';
import { AuthService } from '../auth.service';
import type { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: EnvironmentVariables.jwtSecret,
        });
    }

    public async validate(payload: JwtDto): Promise<User> {
        const user = await this.authService.validateUser(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
