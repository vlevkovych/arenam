import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
    @Field(() => String)
    public emailAddress!: string;

    @Field(() => String)
    public password!: string;
}
