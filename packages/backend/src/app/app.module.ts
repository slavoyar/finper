import { TinkoffModule } from '@modules/tinkoff/tinkoff.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TinkoffModule],
})
export class AppModule {}
