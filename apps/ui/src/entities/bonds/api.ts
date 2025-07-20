import { BondDto } from '@finper/shared';
import { BaseService, CancellablePromise } from '@shared/api';

class BondsService extends BaseService {
  constructor() {
    super('/api/bonds');
  }

  public fetchBonds(): CancellablePromise<Array<BondDto>> {
    return this.api.get();
  }
}

export const bondsService = new BondsService();
