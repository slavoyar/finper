import { Controller, Get } from '@nestjs/common';

import { BondService } from './bond.service';
import { BondDto } from '@investments/shared';
import { bondDtoMapper } from './mappers/bond-dto.mapper';

@Controller('bonds')
export class BondController {
  constructor(private bondService: BondService) {}

  @Get()
  async getBonds(): Promise<BondDto[]> {
    const bonds = await this.bondService.getBonds();
    const bondsDto = bonds.map((bond) => bondDtoMapper(bond)).filter((bond) => !!bond) as BondDto[];
    return bondsDto;
  }
}
