import { Field, ObjectType } from '@nestjs/graphql';

import { MutationPayload } from '../../common/graphql/interfaces/mutation-payload';
import { UserError } from '../../common/graphql/types/user-error';

@ObjectType({ implements: () => [MutationPayload] })
export class LoginPayload implements MutationPayload {
    @Field(() => [UserError], { nullable: true })
    public errors?: UserError[] | undefined;

    @Field(() => Boolean)
    public isLoginSuccessful!: boolean;

    @Field(() => String, { nullable: true })
    public jwtToken?: string;
}
