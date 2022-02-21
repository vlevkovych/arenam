import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';
import type { ExpressContext } from 'apollo-server-express';

@Injectable()
export class GqlAnonymousGuard extends AuthGuard(['jwt', 'anonymous']) {
    public getRequest(ctx: ExecutionContext): unknown {
        const context =
            GqlExecutionContext.create(ctx).getContext<ExpressContext>();
        return context.req;
    }
}
