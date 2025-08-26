import { PrismaService } from '@common/prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  getTransactions(userId: number) {
    return this.prismaService.transaction.findMany({
      where: { userId },
    });
  }

  createTransaction(dto: CreateTransactionDto, userId: number) {
    return this.prismaService.transaction.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  updateTransaction(id: string, dto: UpdateTransactionDto, userId: number) {
    return this.prismaService.limit.update({
      where: { id, userId },
      data: dto,
    });
  }

  deleteTransaction(id: string, userId: number) {
    return this.prismaService.limit.deleteMany({
      where: { id, userId },
    });
  }
}
