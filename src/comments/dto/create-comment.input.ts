import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    public text!: string;
}
