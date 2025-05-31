<template>
  <BondsList v-if="isMobile" />
  <BondsTable v-else />
</template>

<script setup lang="ts">
import { BondsList, BondsTable } from '@entities/bonds';
import { useIsMobile } from '@shared/composabes/useIsMobile';

const isMobile = useIsMobile();
</script>
