import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { PostsService } from '../posts/posts.service';
import { UserService } from '../user/user.service';

import { CommentsService } from './comments.service';

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
            this.commentsService.getCommentsByIds(keys),
    );

    public readonly batchPosts = new DataLoader<Post['id'], Post>(
        async (keys: readonly number[]) =>
            this.postsService.getPostsByIds(keys),
    );

    public constructor(
        private readonly userService: UserService,
        private readonly commentsService: CommentsService,
        private readonly postsService: PostsService,
    ) {}
}
