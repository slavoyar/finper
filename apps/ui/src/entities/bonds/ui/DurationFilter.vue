<template>
  <div style="padding: 8px">
    <div style="margin-bottom: 8px">
      <strong>Min Duration (mo):</strong>
    </div>
    <AInputNumber v-model:value="minDuration" :min="0" placeholder="e.g. 6" style="width: 100%" />

    <div style="margin-bottom: 8px">
      <strong>Max Duration (mo):</strong>
    </div>
    <AInputNumber v-model:value="maxDuration" :min="0" placeholder="e.g. 60" style="width: 100%" />
  </div>
</template>

<script lang="ts" setup>
const minDuration = defineModel<number>('minDuration');
const maxDuration = defineModel<number>('maxDuration');
</script>
