import { LimitDto } from '@finper/shared';
import { BaseService } from '@shared/api';

class LimitService extends BaseService {
  public getLimits(date: string) {
    return this.api.get<LimitDto[]>(`?date=${date}`);
  }
}

export const limitService = new LimitService('/budget/limits');
