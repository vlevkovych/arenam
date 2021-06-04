import { Module } from '@nestjs/common';

import { PrismaModule } from '../config/prisma/prisma.module';

import { RatingService } from './rating.service';

@Module({
    exports: [RatingService],
    imports: [PrismaModule],
    providers: [RatingService],
})
export class RatingModule {}
