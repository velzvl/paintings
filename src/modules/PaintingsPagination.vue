<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { usePaintingStore } from '@/stores/modules/painting';

const paintingStore = usePaintingStore();

const handlePaginationChange = (newPage: number) => {
  paintingStore.currentPage = newPage;
  paintingStore.fetchPaintings(newPage);
};
</script>

<template>
  <Pagination
    @change="handlePaginationChange"
    v-model:current="paintingStore.currentPage"
    v-model:pages="paintingStore.totalPages"
  />
</template>

<style lang="scss" scoped></style>
