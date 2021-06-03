import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserError {
    @Field(() => String)
    public message!: string;

    @Field(() => [String], { nullable: true })
    public field!: string[];
}
