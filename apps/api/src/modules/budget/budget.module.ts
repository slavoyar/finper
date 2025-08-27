import { PrismaModule } from '@common/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController, TransactionController],
  providers: [CategoryService, TransactionService],
})
export class BudgetModule {}
