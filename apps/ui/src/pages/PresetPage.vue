<template>
  <ASpace direction="vertical" :style="{ width: '100%' }">
    <APageHeader :title="$t('presets.title')" />
    <CreatePresetButton />
    <BondPresetsTable />
  </ASpace>
</template>

<script setup lang="ts">
import { BondPresetsTable, CreatePresetButton } from '@entities/presets';
</script>
