import { User } from '@common/decorators/user';
import { ValidateBody } from '@common/decorators/validation';
import { User as UserType } from '@external/telegram/interfaces';
import {
  CreateTransactionDto,
  CreateTransactionSchema,
  UpdateTransactionDto,
  UpdateTransactionSchema,
} from '@finper/shared';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TransactionService } from './transaction.service';

@Controller('budget/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll(@User() user: UserType) {
    return this.transactionService.getTransactions(user.id);
  }

  @Post()
  create(@ValidateBody(CreateTransactionSchema) dto: CreateTransactionDto, @User() user: UserType) {
    return this.transactionService.createTransaction(dto, user.id);
  }

  @Put(':id')
  update(
    @ValidateBody(UpdateTransactionSchema) dto: UpdateTransactionDto,
    @Param('id') id: string,
    @User() user: UserType
  ) {
    return this.transactionService.updateTransaction(id, dto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserType) {
    return this.transactionService.deleteTransaction(id, user.id);
  }
}
