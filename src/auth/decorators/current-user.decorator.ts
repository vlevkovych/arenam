import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): unknown => {
        const context = GqlExecutionContext.create(ctx);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return context.getContext().req.user;
    },
);
