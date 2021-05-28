import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
    @Field(() => String)
    public emailAddress!: string;

    @Field(() => String)
    public password!: string;

    @Field(() => String)
    public name!: string;
}
