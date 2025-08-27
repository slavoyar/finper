import { LimitDto } from '@finper/shared';
import { BaseService } from '@shared/api';

class LimitService extends BaseService {
  public getLimits() {
    return this.api.get<LimitDto[]>();
  }
}

export const limitService = new LimitService('/budget/limits');
