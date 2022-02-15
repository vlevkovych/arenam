import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { ExecutionContext } from '@nestjs/common';
import type { ExpressContext } from 'apollo-server-express';

export const CurrentUser = createParamDecorator(
    (_data, ctx: ExecutionContext): Express.User => {
        const context =
            GqlExecutionContext.create(ctx).getContext<ExpressContext>();
        const { user } = context.req;
        if (!user) {
            throw Error('Unauthorized');
        }
        return user;
    },
);
