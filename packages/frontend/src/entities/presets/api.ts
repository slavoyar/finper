import { PresetDto } from '@finper/shared';
import { BaseService, CancellablePromise } from '@shared/api';

class PresetService extends BaseService {
  constructor() {
    super('/api/presets');
  }

  fetchPresets(): CancellablePromise<Array<PresetDto>> {
    return this.api.get();
  }

  createPreset(preset: PresetDto): CancellablePromise<void> {
    return this.api.post(preset);
  }
}

export const presetsService = new PresetService();
