import { PrismaModule } from '@common/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { PresetController } from './preset.controller';
import { PresetService } from './preset.service';

@Module({
  imports: [PrismaModule],
  controllers: [PresetController],
  providers: [PresetService],
  exports: [PresetService],
})
export class PresetModule {}
