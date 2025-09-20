<template>
  <AForm layout="vertical" :model="category" :rules="rulesRef">
    <AFormItem :label="$t('category.name')" v-bind="validateInfos.name">
      <AInput v-model:value="category.name" :placeholder="$t('category.namePlaceholder')" />
    </AFormItem>

    <AFormItem>
      <ACheckbox v-model:checked="withLimit">
        {{ $t('category.withLimit') }}
      </ACheckbox>
    </AFormItem>

    <template v-if="withLimit">
      <AFormItem :label="$t('category.limitAmount')" v-bind="validateInfos.amount" name="amount">
        <AInputNumber
          v-model:value="category.limit!.amount"
          :placeholder="$t('category.limitAmountPlaceholder')"
          style="width: 100%"
          :min="0"
        />
      </AFormItem>
      <AFormItem
        v-if="withLimit"
        :label="$t('category.limitPeriod')"
        v-bind="validateInfos.period"
        name="period"
      >
        <ASelect v-model:value="category.limit!.period" style="width: 100%" :default-value="'monthly'">
          <ASelectOption value="monthly">{{ $t('category.monthly') }}</ASelectOption>
          <ASelectOption value="yearly">{{ $t('category.yearly') }}</ASelectOption>
        </ASelect>
      </AFormItem>
    </template>
  </AForm>
</template>

<script setup lang="ts">
import { UpdateCategoryDto } from '@finper/shared';
import { useForm } from 'ant-design-vue/es/form';
import { ValidateInfo } from 'ant-design-vue/es/form/useForm';
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const category = defineModel<UpdateCategoryDto>('category', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });

const { t } = useI18n();
const withLimit = ref(true);

const rulesRef = reactive({
  name: [{ required: true, message: t('category.nameRequired') }],
  amount: [
    {
      required: withLimit.value,
      message: t('category.limitAmountRequired'),
    },
  ],
  period: [
    {
      required: withLimit.value,
      message: t('category.limitPeriodRequired'),
    },
  ],
});

const model = computed(() => ({
  ...category.value,
  limit: undefined,
  ...(withLimit.value ? category.value.limit : {}),
}));

const { validateInfos } = useForm(model, rulesRef, {
  onValidate: () => {
    isValid.value = Object.values(validateInfos).every(
      (item: ValidateInfo) => item?.validateStatus === 'success'
    );
  },
});

watch(
  () => withLimit.value,
  (newVal) => {
    if (newVal && !category.value.limit) {
      category.value.limit = { amount: 0, period: 'monthly' };
    } else if (!newVal) {
      category.value.limit = undefined;
    }
  }
);
</script>
