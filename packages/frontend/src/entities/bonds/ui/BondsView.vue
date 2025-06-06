<template>
  <BondsList v-if="isMobile" />
  <BondsTable v-else />
</template>

<script setup lang="ts">
import { useIsMobile } from '@shared/composabes';

import BondsList from './BondsList.vue';
import BondsTable from './BondsTable.vue';

const isMobile = useIsMobile();
</script>
