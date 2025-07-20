import { PresetDto } from '@finper/shared';
import { BaseService, CancellablePromise } from '@shared/api';

class PresetService extends BaseService {
  constructor() {
    super('/api/presets');
  }

  fetchPresets(type: PresetDto['type']): CancellablePromise<Array<PresetDto>> {
    return this.api.get(`/${type}`);
  }

  createPreset(preset: PresetDto): CancellablePromise<void> {
    return this.api.post(preset);
  }

  deletePreset(id: PresetDto['id']): CancellablePromise<void> {
    return this.api.delete(`/${id}`);
  }
}

export const presetsService = new PresetService();
