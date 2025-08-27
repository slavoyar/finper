<template>
  <AForm layout="vertical" :model="category" :rules="rulesRef">
    <AFormItem :label="$t('category.name')" v-bind="validateInfos.name">
      <AInput v-model:value="category.name" :placeholder="$t('category.namePlaceholder')" />
    </AFormItem>

    <AFormItem :label="$t('category.description')" v-bind="validateInfos.description">
      <AInput
        v-model:value="category.description"
        :placeholder="$t('category.descriptionPlaceholder')"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import { UpdateCategoryDto } from '@finper/shared';
import { useForm } from 'ant-design-vue/es/form';
import { ValidateInfo } from 'ant-design-vue/es/form/useForm';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const category = defineModel<UpdateCategoryDto>('category', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });
const { t } = useI18n();

const rulesRef = reactive({
  name: [{ required: true, message: t('category.nameRequired') }],
  description: [{ required: true, message: t('category.descriptionRequired') }],
});

const { validateInfos } = useForm(category, rulesRef, {
  onValidate: () => {
    isValid.value = Object.values(validateInfos).every(
      (item: ValidateInfo) => item?.validateStatus === 'success'
    );
  },
});
</script>
