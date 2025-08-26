import { PrismaService } from '@common/prisma/prisma.service';
import { CreateLimitDto, UpdateLimitDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LimitService {
  constructor(private readonly prismaService: PrismaService) {}

  getLimits(userId: number) {
    return this.prismaService.limit.findMany({
      where: { userId },
    });
  }

  createLimit(dto: CreateLimitDto, userId: number) {
    return this.prismaService.limit.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  updateLimit(id: string, dto: UpdateLimitDto, userId: number) {
    return this.prismaService.limit.update({
      where: { id, userId },
      data: dto,
    });
  }

  deleteLimit(id: string, userId: number) {
    return this.prismaService.limit.deleteMany({
      where: { id, userId },
    });
  }
}
