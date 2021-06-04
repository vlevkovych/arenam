import { Field, ObjectType } from '@nestjs/graphql';

import { MutationPayload } from '../../common/graphql/interfaces/mutation-payload';
import { UserError } from '../../common/graphql/types/user-error';

@ObjectType({ implements: () => [MutationPayload] })
export class RatePayload implements MutationPayload {
    @Field(() => [UserError])
    public errors!: UserError[];

    @Field(() => Boolean)
    public isRateSuccessful!: boolean;
}