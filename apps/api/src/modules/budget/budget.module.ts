import { PrismaModule } from '@common/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { LimitController } from './limit.controller';
import { LimitService } from './limit.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController, LimitController, TransactionController],
  providers: [CategoryService, LimitService, TransactionService],
})
export class BudgetModule {}
