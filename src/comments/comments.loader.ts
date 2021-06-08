import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { PostsRepository } from '../posts/posts.repository';
import { UserService } from '../user/user.service';

import { CommentsRepository } from './comments.repository';

import type { Post } from '../posts/posts.models';
import type { User } from '../user/user.models';
import type { Comment } from './comments.models';

@Injectable({ scope: Scope.REQUEST })
export default class CommentsLoader {
    public readonly batchCreators = new DataLoader<User['id'], User>(
        async (keys: readonly number[]) => this.userService.getUsersByIds(keys),
    );

    public readonly batchRepliedTo = new DataLoader<Comment['id'], Comment>(
        async (keys: readonly number[]) =>
            this.commentsRepository.findCommentsByIds(keys),
    );

    public readonly batchPosts = new DataLoader<Post['id'], Post>(
        async (keys: readonly number[]) =>
            this.postsRepository.findPostsByIds(keys),
    );

    public constructor(
        private readonly userService: UserService,
        private readonly commentsRepository: CommentsRepository,
        private readonly postsRepository: PostsRepository,
    ) {}
}
