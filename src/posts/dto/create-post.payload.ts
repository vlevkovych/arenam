import { Field, ObjectType } from '@nestjs/graphql';

import { MutationPayload } from '../../common/graphql/interfaces/mutation-payload';
import { UserError } from '../../common/graphql/types/user-error';
import { Post } from '../posts.models';

@ObjectType({ implements: () => [MutationPayload] })
export class CreatePostPayload implements MutationPayload {
    @Field(() => [UserError], { nullable: true })
    public errors?: UserError[] | undefined;

    @Field(() => Post, { nullable: true })
    public post?: Post;
}
