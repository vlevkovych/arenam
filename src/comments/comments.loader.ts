import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UserService } from '../user/user.service';

import type { User } from '../user/user.models';

@Injectable({ scope: Scope.REQUEST })
export default class CommentsLoader {
    public readonly batchCreators = new DataLoader<User['id'], User>(
        async (keys: readonly number[]) => this.userService.getUsersByIds(keys),
    );

    public constructor(private readonly userService: UserService) {}
}
