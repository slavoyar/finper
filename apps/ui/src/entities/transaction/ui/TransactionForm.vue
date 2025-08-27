<template>
  <AForm layout="vertical" :model="transaction" :rules="rulesRef">
    <AFormItem :label="$t('transaction.name')" v-bind="validateInfos.description">
      <AInput
        v-model:value="transaction.name"
        :placeholder="$t('transaction.namePlaceholder')"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </AFormItem>

    <AFormItem :label="$t('transaction.amount')" v-bind="validateInfos.amount">
      <AInputNumber
        v-model:value="transaction.amount"
        :min="0"
        style="width: 100%"
        :placeholder="$t('transaction.amountPlaceholder')"
      />
    </AFormItem>

    <AFormItem :label="$t('transaction.date')" v-bind="validateInfos.date">
      <ADatePicker
        v-model:value="transaction.date"
        style="width: 100%"
        :placeholder="$t('transaction.datePlaceholder')"
      />
    </AFormItem>

    <AFormItem :label="$t('transaction.category')" v-bind="validateInfos.categoryId">
      <ACategorySelect
        v-model:value="transaction.categoryId"
        :placeholder="$t('transaction.categoryPlaceholder')"
      />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import { UpdateTransactionDto } from '@finper/shared';
import { useForm } from 'ant-design-vue/es/form';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const transaction = defineModel<UpdateTransactionDto>('transaction', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });
const { t } = useI18n();

const rulesRef = reactive({
  amount: [{ required: true, message: t('transaction.amountRequired') }],
  categoryId: [{ required: true, message: t('transaction.categoryRequired') }],
  description: [{ required: true, message: t('transaction.descriptionRequired') }],
});

const { validateInfos } = useForm(transaction, rulesRef, {
  onValidate: () => {
    isValid.value = Object.values(validateInfos).every((item) => item?.validateStatus === 'success');
  },
});
</script>
