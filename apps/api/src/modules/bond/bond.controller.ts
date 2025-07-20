import { Public } from '@common/decorators/public';
import { Controller, Get, Post, Query } from '@nestjs/common';

import { BondService } from './bond.service';
import { BondCronService } from './bond-cron.service';
import { bondDtoMapper } from './mappers/bond-dto.mapper';

@Controller('bonds')
export class BondController {
  constructor(
    private bondService: BondService,
    private bondCronService: BondCronService
  ) {}

  @Get()
  public async getBonds() {
    const bonds = await this.bondService.getBonds();
    const bondsDto = bonds.map((bond) => bondDtoMapper(bond)).filter((bond) => !!bond);
    return bondsDto;
  }

  @Public()
  @Post('cron/update-bonds')
  public updateBonds(@Query('offset') offset = '0') {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.bondCronService.updateBonds(Number(offset));
  }

  @Post('cron/update-prices')
  public updatePrices() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.bondCronService.updateBondPrices();
  }
}
