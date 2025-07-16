import { User } from '@common/decorators/user';
import { User as UserType } from '@external/telegram/interfaces';
import { CreatePresetDto } from '@finper/shared';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { PresetService } from './preset.service';

@Controller('presets')
export class PresetController {
  constructor(private presetService: PresetService) {}

  @Get(':type')
  public getPresets(@Param('type') type: string, @User() user: UserType) {
    return this.presetService.getPresets(type, user.id);
  }

  @Post()
  public createPreset(@Body() dto: CreatePresetDto, @User() user: UserType) {
    return this.presetService.createPreset(dto, user.id);
  }

  @Delete(':id')
  public deletePreset(@Param('id') id: string, @User() user: UserType) {
    return this.presetService.deletePreset(id, user.id);
  }
}
