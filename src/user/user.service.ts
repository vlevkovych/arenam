import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    // eslint-disable-next-line class-methods-use-this
    public helloWorld(): string {
        return 'Hello world!';
    }
}
