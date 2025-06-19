<template>
  <ASpace direction="vertical" :style="{ width: '100%' }">
    <CreatePresetButton />
    <BondPresetsTable />
  </ASpace>
</template>

<script setup lang="ts">
import { BondPresetsTable, CreatePresetButton } from '@entities/presets';
</script>
