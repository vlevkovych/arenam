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

    @Field(() => Int)
    public rating!: number;

    @Field(() => String, { nullable: true })
    public myRatingStatus?: string | null;

    @Field()
    public createdAt!: Date;

    @Field(() => User)
    public creator!: User;
}
