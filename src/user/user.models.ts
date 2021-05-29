import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Post } from '../posts/posts.models';

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

    @Field(() => [Post])
    public posts?: Post[];

    public password!: string;
}
