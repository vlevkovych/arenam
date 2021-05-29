import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
    @Field(() => String, { nullable: true })
    public title?: string;

    @Field(() => String, { nullable: true })
    public body?: string;
}
