import { User } from '@common/decorators/user';
import { ValidateBody } from '@common/decorators/validation';
import { User as UserType } from '@external/telegram/interfaces';
import {
  CreateCategoryDto,
  CreateCategorySchema,
  UpdateCategoryDto,
  UpdateCategorySchema,
} from '@finper/shared';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('budget/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  findAll(@User() user: UserType) {
    return this.categoryService.getCategories(user.id);
  }

  @Post()
  create(@ValidateBody(CreateCategorySchema) dto: CreateCategoryDto, @User() user: UserType) {
    return this.categoryService.createCategory(dto, user.id);
  }

  @Put(':id')
  update(
    @ValidateBody(UpdateCategorySchema) dto: UpdateCategoryDto,
    @Param('id') id: string,
    @User() user: UserType
  ) {
    return this.categoryService.updateCategory(id, dto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserType) {
    return this.categoryService.deleteCategory(id, user.id);
  }
}
