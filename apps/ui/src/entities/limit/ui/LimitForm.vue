<template>
  <AForm layout="vertical" :model="limit" :rules="rulesRef">
    <AFormItem :label="$t('limit.limitAmount')" v-bind="validateInfos.amount">
      <AInputNumber
        v-model:value="limit.amount"
        :min="0"
        style="width: 100%"
        :placeholder="$t('limit.limitAmountPlaceholder')"
      />
    </AFormItem>

    <AFormItem :label="$t('limit.period')" v-bind="validateInfos.period">
      <ASelect
        v-model:value="limit.period"
        :options="periodOptions"
        :placeholder="$t('limit.periodPlaceholder')"
      />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import { limitPeriods, UpdateLimitDto } from '@finper/shared';
import { useForm } from 'ant-design-vue/es/form';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const limit = defineModel<UpdateLimitDto>('limit', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });
const { t } = useI18n();

const periodOptions = (limitPeriods as string[]).map((period) => ({
  label: t(`limit.periodOptions.${period}`),
  value: period,
}));

const rulesRef = reactive({
  amount: [{ required: true, message: t('limit.limitAmountRequired') }],
  period: [{ required: true, message: t('limit.periodRequired') }],
});

const { validateInfos } = useForm(limit, rulesRef, {
  onValidate: () => {
    isValid.value = Object.values(validateInfos).every((item) => item?.validateStatus === 'success');
  },
});
</script>
