<template>
  <ASpace direction="vertical" :style="{ width: '100%' }">
    <APageHeader :title="$t('bonds.title')" />
    <BondsList />
  </ASpace>
</template>

<script setup lang="ts">
import { BondsList } from '@entities/bonds';
</script>
