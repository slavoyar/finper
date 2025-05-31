import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { BondService } from './bond.service';
import { BondDto } from '@investments/shared';
import { bondDtoMapper } from './mappers/bond-dto.mapper';
import { BondCronService } from './bond-cron.service';

@Controller('bonds')
export class BondController {
  constructor(
    private bondService: BondService,
    private bondCronService: BondCronService
  ) {}

  @Get()
  async getBonds(): Promise<BondDto[]> {
    const bonds = await this.bondService.getBonds();
    const bondsDto = bonds.map((bond) => bondDtoMapper(bond)).filter((bond) => !!bond) as BondDto[];
    return bondsDto;
  }

  @Post('cron/update-bonds')
  async updateBonds(@Query('offset') offset = '0') {
    this.bondCronService.updateBonds(Number(offset));
  }

  @Post('cron/update-prices')
  async updatePrices() {
    this.bondCronService.updateBondPrices();
  }
}
