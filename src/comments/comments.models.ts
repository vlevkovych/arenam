import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { RatingStatus } from '../common/graphql/enums/rating-status.enum';
import { Post } from '../posts/posts.models';
import { User } from '../user/user.models';

registerEnumType(RatingStatus, {
    name: 'RatingStatus',
});

@ObjectType()
export class Comment {
    @Field(() => ID)
    public id!: number;

    @Field(() => String)
    public text!: string;

    @Field(() => User)
    public creator?: User;

    @Field(() => Int)
    public rating!: number;

    @Field(() => RatingStatus, { defaultValue: RatingStatus.neutral })
    public myRatingStatus?: RatingStatus;

    @Field()
    public createdAt!: Date;

    @Field(() => Post, { nullable: true })
    public post?: Post;

    @Field(() => Comment, { nullable: true })
    public repliedTo?: Comment;

    @Field(() => [Comment])
    public replies!: Comment[];

    @Field(() => String)
    public body!: string;

    @Field(() => Int)
    public creatorId!: number;
}
