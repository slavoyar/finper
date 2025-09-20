<template>
  <AModal
    :title="$t('category.create')"
    :open="isOpen"
    :ok-button-props="{ disabled: isDisabled, loading: isLoading }"
    :cancel-button-props="{ disabled: isDisabled }"
    :ok-text="$t('common.create')"
    :cancel-text="$t('common.cancel')"
    @cancel="close"
    @ok="save"
  >
    <CreateCategoryForm />
  </AModal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const isOpen = defineModel<boolean>('isOpen', { required: true });

const isValid = computed(() => true);
const isLoading = computed(() => false);

const isDisabled = computed(() => !isValid.value || isLoading.value);

const close = () => {
  isOpen.value = false;
};

const save = async () => {};
</script>
