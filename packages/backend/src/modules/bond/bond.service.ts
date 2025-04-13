import { Injectable } from '@nestjs/common';

@Injectable()
export class BondService {
  async getPresets() {
    return Promise.resolve([]);
  }
}
