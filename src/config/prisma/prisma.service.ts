import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}
