import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvironmentVariables } from '../../config/app/env.type';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: EnvironmentVariables.jwtSecret,
        });
    }

    public authenticate(): void {
        this.success({});
    }
}
