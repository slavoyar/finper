<template>
  <AButton type="primary" @click="isOpen = true"> {{ $t('presets.create') }} </AButton>
  <AModal
    :title="$t('presets.create')"
    :open="isOpen"
    :ok-button-props="{ disabled: !isValid || presetStore.isLoading, loading: presetStore.isLoading }"
    :cancel-button-props="{ disabled: presetStore.isLoading }"
    :ok-text="$t('common.create')"
    :cancel-text="$t('common.cancel')"
    @cancel="cancel"
    @ok="save"
  >
    <PresetForm v-model:preset="preset" :type="type" v-model:is-valid="isValid" />
  </AModal>
</template>

<script lang="ts" setup>
import { PresetDto } from '@finper/shared';
import { ref } from 'vue';

import { usePresetStore } from '../model';
import PresetForm from './PresetForm.vue';

const presetStore = usePresetStore();

const isOpen = ref(false);
const isValid = ref(false);
const type = ref<PresetDto['type']>('bond');
const preset = ref({});

const cancel = () => {
  isOpen.value = false;
  isValid.value = false;
  preset.value = {};
};

const save = async () => {
  await presetStore.createPreset({
    ...preset.value,
    type: type.value,
  } as PresetDto);
  if (presetStore.isError) {
    // TODO: add notification that preset was not created
    return;
  }
  cancel();
};
</script>
