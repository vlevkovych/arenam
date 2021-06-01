import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { User } from '../user/user.models';

export enum RatingStatus {
    neutral = 'neutral',
    upvoted = 'upvoted',
    downvoted = 'downvoted',
}

registerEnumType(RatingStatus, {
    name: 'RatingStatus',
});

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

    @Field(() => RatingStatus, { defaultValue: RatingStatus.neutral })
    public myRatingStatus?: RatingStatus;

    @Field(() => Int)
    public creatorId!: number;
}
