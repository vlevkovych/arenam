import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.models';

@ObjectType()
export class Post {
    @Field(() => ID)
    public id!: number;

    @Field(() => String)
    public title!: string;

    @Field(() => String)
    public body!: string;

    @Field(() => User)
    public creator?: User;

    @Field(() => Int)
    public rating!: number;

    @Field()
    public createdAt!: Date;

    @Field(() => String, { nullable: true })
    public myRatingStatus?: string | null;

    @Field(() => Int)
    public creatorId!: number;
}
