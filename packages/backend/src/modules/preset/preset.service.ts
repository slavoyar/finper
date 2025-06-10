import { PrismaService } from '@common/prisma/prisma.service';
import { CreatePresetDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PresetService {
  constructor(private readonly prismaService: PrismaService) {}

  public getPresets(type: string) {
    return this.prismaService.preset.findMany({ where: { type } });
  }

  public createPreset(dto: CreatePresetDto) {
    return this.prismaService.preset.create({ data: dto });
  }

  public deletePreset(id: string) {
    return this.prismaService.preset.delete({ where: { id } });
  }
}
