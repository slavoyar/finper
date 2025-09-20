<template>
  <AButton type="primary" @click="open"> {{ $t('presets.create') }} </AButton>
  <AModal
    :title="$t('presets.create')"
    :open="isOpen"
    :ok-button-props="{ disabled: !isValid || presetStore.isLoading, loading: presetStore.isLoading }"
    :cancel-button-props="{ disabled: presetStore.isLoading }"
    :ok-text="$t('common.create')"
    :cancel-text="$t('common.cancel')"
    @cancel="close"
    @ok="save"
  >
    <PresetForm v-model:preset="data" :type="type" v-model:is-valid="isValid" />
  </AModal>
</template>

<script lang="ts" setup>
import { PresetDto } from '@finper/shared';
import { useModal } from '@shared/composabes';
import { ref } from 'vue';

import { usePresetStore } from '../model';
import PresetForm from './PresetForm.vue';

const presetStore = usePresetStore();
const { isOpen, isValid, data, open, close } = useModal<PresetDto>();

const type = ref<PresetDto['type']>('bond');

const save = async () => {
  await presetStore.createPreset({
    ...data.value,
    type: type.value,
  } as PresetDto);
  if (presetStore.isError) {
    // TODO: add notification that preset was not created
    return;
  }
  close();
};
</script>
