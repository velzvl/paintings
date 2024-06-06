<script lang="ts" setup>
import Header from '@/modules/Header.vue';
import Filters from '@/modules/Filters.vue';
import Paintings from '@/modules/Paintings.vue';
import PaintingsPagination from '@/modules/PaintingsPagination.vue';
import { onMounted } from 'vue';
import { usePaintingStore } from '@/stores/modules/painting';

const paintingStore = usePaintingStore();

onMounted(() => {
  paintingStore.fetchAuthors();
  paintingStore.fetchLocations();
  paintingStore.fetchPaintings();
});
</script>

<template>
  <main class="main">
    <Header />
    <Filters />
    <Paintings />
    <PaintingsPagination />
  </main>
</template>

<style lang="scss" scoped>

.main {
  display: flex;
  flex-direction: column;
  min-height: inherit;
  background-color: var(--color-background);
}

.painting__container {
  display: flex;
  flex-direction: column;
  min-height: inherit;
}
</style>
