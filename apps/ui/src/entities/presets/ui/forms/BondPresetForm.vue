<template>
  <AForm layout="vertical" :model="preset" :rules="rulesRef">
    <AFormItem :label="$t('presets.risk')" v-bind="validateInfos.riskLevels">
      <ASelect
        v-model:value="preset.riskLevels"
        :options="riskOptions"
        :token-separators="[',']"
        mode="tags"
        type="number"
        :placeholder="$t('presets.riskPlaceholder')"
      />
    </AFormItem>

    <AFormItem :label="$t('presets.count')" v-bind="validateInfos.count">
      <AInputNumber v-model:value="preset.count" :min="5" style="width: 100%" />
    </AFormItem>

    <AFormItem :label="$t('presets.minDuration')">
      <AInputNumber v-model:value="preset.minDuration" :min="0" style="width: 100%" />
    </AFormItem>

    <AFormItem :label="$t('presets.maxDuration')">
      <AInputNumber
        v-model:value="preset.maxDuration"
        :min="preset.minDuration ?? 0 + 1"
        style="width: 100%"
      />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import { BondPresetDto } from '@finper/shared';
import { riskTypeByLevel } from '@shared/consts';
import { useForm } from 'ant-design-vue/es/form';
import { ValidateInfo } from 'ant-design-vue/es/form/useForm';
import { reactive } from 'vue';

const preset = defineModel<Partial<BondPresetDto>>('preset', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });

const riskOptions = Object.keys(riskTypeByLevel).map((key) => ({
  label: riskTypeByLevel[Number(key)],
  value: Number(key),
}));

const rulesRef = reactive({
  riskLevels: [{ required: true, message: 'Please select risk levels' }],
  count: [{ required: true, message: 'Please select count' }],
});

const { validateInfos } = useForm(preset, rulesRef, {
  onValidate: () => {
    isValid.value = Object.values(validateInfos).every(
      (item: ValidateInfo) => item?.validateStatus === 'success'
    );
  },
});
</script>
