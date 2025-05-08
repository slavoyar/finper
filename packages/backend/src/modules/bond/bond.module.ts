import { PrismaModule } from '@common/prisma/prisma.module';
import { TinkoffModule } from '@external/tinkoff/tinkoff.module';
import { Module } from '@nestjs/common';

import { BondController } from './bond.controller';
import { BondService } from './bond.service';
import { BondCronService } from './bond-cron.service';

@Module({
  imports: [TinkoffModule, PrismaModule],
  providers: [BondService, BondCronService],
  controllers: [BondController],
  exports: [BondService, PrismaModule],
})
export class BondModule {}
