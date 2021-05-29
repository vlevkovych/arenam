import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
    @Field(() => String)
    public title!: string;

    @Field(() => String)
    public body!: string;
}
