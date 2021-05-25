import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    public id!: number;

    @Field(() => String)
    public name!: string;

    @Field()
    public signupDate!: Date;

    @Field(() => String)
    public emailAddress!: string;

    @Field(() => String)
    public password!: string;
}
