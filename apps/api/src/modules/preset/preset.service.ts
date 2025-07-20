import { PrismaService } from '@common/prisma/prisma.service';
import { CreatePresetDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PresetService {
  constructor(private readonly prismaService: PrismaService) {}

  public getPresets(type: string, userId: number) {
    return this.prismaService.preset.findMany({ where: { type, userId } });
  }

  public getPreset(id: string) {
    return this.prismaService.preset.findUnique({ where: { id } });
  }

  public createPreset(dto: CreatePresetDto, userId: number) {
    return this.prismaService.preset.create({ data: { ...dto, userId } });
  }

  public deletePreset(id: string, userId: number) {
    return this.prismaService.preset.delete({ where: { id, userId } });
  }
}
