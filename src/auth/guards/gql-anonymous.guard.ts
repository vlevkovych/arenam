import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';

@Injectable()
export class GqlAnonymousGuard extends AuthGuard(['jwt', 'anonymous']) {
    public getRequest(context: ExecutionContext): unknown {
        const ctx = GqlExecutionContext.create(context);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return ctx.getContext().req;
    }
}
