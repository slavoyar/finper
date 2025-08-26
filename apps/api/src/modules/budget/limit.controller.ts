import { User } from '@common/decorators/user';
import { ValidateBody } from '@common/decorators/validation';
import { User as UserType } from '@external/telegram/interfaces';
import { CreateLimitDto, CreateLimitSchema, UpdateLimitDto, UpdateLimitSchema } from '@finper/shared';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { LimitService } from './limit.service';

@Controller('budget/limit')
export class LimitController {
  constructor(private readonly limitService: LimitService) {}
  @Get()
  findAll(@User() user: UserType) {
    return this.limitService.getLimits(user.id);
  }

  @Post()
  create(@ValidateBody(CreateLimitSchema) dto: CreateLimitDto, @User() user: UserType) {
    return this.limitService.createLimit(dto, user.id);
  }

  @Put(':id')
  update(
    @ValidateBody(UpdateLimitSchema) dto: UpdateLimitDto,
    @Param('id') id: string,
    @User() user: UserType
  ) {
    return this.limitService.updateLimit(id, dto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserType) {
    return this.limitService.deleteLimit(id, user.id);
  }
}
