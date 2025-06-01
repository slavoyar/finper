<template>
  <div style="padding: 8px">
    <div style="margin-bottom: 8px">
      <strong>Min Duration (mo):</strong>
    </div>
    <AInputNumber v-model:value="innerMinDuration" :min="0" placeholder="e.g. 6" style="width: 100%" />

    <div style="margin-bottom: 8px">
      <strong>Max Duration (mo):</strong>
    </div>
    <AInputNumber v-model:value="innerMaxDuration" :min="0" placeholder="e.g. 60" style="width: 100%" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

interface Props {
  minDuration?: number;
  maxDuration?: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:minDuration', value?: number): void;
  (e: 'update:maxDuration', value?: number): void;
}>();

const innerMinDuration = ref(props.minDuration);
const innerMaxDuration = ref(props.maxDuration);

watch(innerMinDuration, (newVal) => {
  emit('update:minDuration', newVal);
});
watch(innerMaxDuration, (newVal) => {
  emit('update:maxDuration', newVal);
});
</script>
