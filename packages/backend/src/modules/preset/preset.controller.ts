import { CreatePresetDto } from '@finper/shared';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { PresetService } from './preset.service';

@Controller('presets')
export class PresetController {
  constructor(private presetService: PresetService) {}

  @Get(':type')
  public getPresets(@Param('type') type: string) {
    return this.presetService.getPresets(type);
  }

  @Post()
  public createPreset(@Body() dto: CreatePresetDto) {
    return this.presetService.createPreset(dto);
  }

  @Delete(':id')
  public deletePreset(@Param('id') id: string) {
    return this.presetService.deletePreset(id);
  }
}
