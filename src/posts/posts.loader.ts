import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UserRepository } from '../user/user.repository';

import type { User } from '../user/user.models';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
    public readonly batchCreators = new DataLoader<User['id'], User>(
        async (keys: readonly number[]) =>
            this.userRepository.findUsersByIds(keys),
    );

    public constructor(private readonly userRepository: UserRepository) {}
}
