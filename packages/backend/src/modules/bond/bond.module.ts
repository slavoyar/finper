import { TinkoffModule } from '@modules/tinkoff/tinkoff.module';
import { Module } from '@nestjs/common';

import { BondService } from './bond.service';
import { BondCronService } from './bond-cron.service';

@Module({
  imports: [TinkoffModule],
  providers: [BondService, BondCronService],
  exports: [BondService],
})
export class BondModule {}
