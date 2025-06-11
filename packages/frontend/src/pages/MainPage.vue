<template>
  <BondsList />
  <CreatePresetButton />
  <BondPresetsTable />
</template>

<script setup lang="ts">
import { BondsList } from '@entities/bonds';
import { BondPresetsTable, CreatePresetButton } from '@entities/presets';
</script>
