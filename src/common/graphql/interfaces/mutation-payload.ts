import { Field, InterfaceType } from '@nestjs/graphql';

import { UserError } from '../types/user-error';

@InterfaceType()
export abstract class MutationPayload {
    @Field(() => [UserError], { nullable: true })
    public errors?: UserError[] | undefined;
}
