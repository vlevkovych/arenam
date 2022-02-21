import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';
import type { ExpressContext } from 'apollo-server-express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    public getRequest(ctx: ExecutionContext): unknown {
        const context =
            GqlExecutionContext.create(ctx).getContext<ExpressContext>();
        return context.req;
    }
}
