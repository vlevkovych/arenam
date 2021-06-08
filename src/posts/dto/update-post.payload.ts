import { Field, ObjectType } from '@nestjs/graphql';

import { MutationPayload } from '../../common/graphql/interfaces/mutation-payload';
import { UserError } from '../../common/graphql/types/user-error';
import { Post } from '../posts.models';

@ObjectType({ implements: () => [MutationPayload] })
export class UpdatePostPayload implements MutationPayload {
    @Field(() => [UserError])
    public errors!: UserError[];

    @Field(() => Post, { nullable: true })
    public post?: Post | null;
}
