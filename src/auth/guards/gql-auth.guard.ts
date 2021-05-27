import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    public getRequest(context: ExecutionContext): unknown {
        const ctx = GqlExecutionContext.create(context);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return ctx.getContext().req;
    }
}
