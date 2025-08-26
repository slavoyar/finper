import { PrismaService } from '@common/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  getCategories(userId: number) {
    return this.prismaService.category.findMany({
      where: { userId },
    });
  }

  createCategory(dto: CreateCategoryDto, userId: number) {
    return this.prismaService.category.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  updateCategory(id: string, dto: UpdateCategoryDto, userId: number) {
    return this.prismaService.category.update({
      where: { id, userId },
      data: dto,
    });
  }

  deleteCategory(id: string, userId: number) {
    return this.prismaService.category.deleteMany({
      where: { id, userId },
    });
  }
}
