<script setup lang="ts">
import Input from '@/shared/Input.vue';
import SelectList from '@/components/SelectList.vue';
import SelectNumToNum from '@/components/SelectNumToNum.vue';
import { usePaintingStore } from '@/stores/modules/painting';
import { watch } from 'vue';
import getAuthorItemPlaceholder from '@/helpers/getAuthorItemPlaceholder';
import getLocationItemPlaceholder from '@/helpers/getLocationItemPlaceholder';

const paintingStore = usePaintingStore();

watch(paintingStore.filters, () => {
  paintingStore.currentPage = 1;
  paintingStore.fetchPaintings();
});

</script>

<template>
  <section>
    <div class="container">
      <ul class="filters">
        <li class="filters__item">
          <Input
            v-model:value="paintingStore.filters.name"
            placeholder="Name"
          />
        </li>
        <li class="filters__item" style="z-index: 12;">
          <SelectList
            v-model:value="paintingStore.filters.author"
            select-placeholder="Author"
            v-model:list="paintingStore.authors"
            :get-item-placeholder="getAuthorItemPlaceholder"
          />
        </li>
        <li class="filters__item" style="z-index: 11;">
          <SelectList
            v-model:value="paintingStore.filters.location"
            select-placeholder="Location"
            v-model:list="paintingStore.locations"
            :get-item-placeholder="getLocationItemPlaceholder"
          />
        </li>
        <li class="filters__item">
          <SelectNumToNum
            v-model:value="paintingStore.filters.created"
            select-placeholder="Created"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.filters {
  display: flex;
  position: relative;
  z-index: 1;

  &__item {
    width: calc((100% - (3 * var(--gap-element))) / 4);

    &:not(:first-child) {
      margin-left: var(--gap-element);
    }
  }

  @include media-sm {
    & {
      flex-direction: column;
    }

    &__item {
      width: auto;

      &:not(:first-child) {
        margin-left: 0;
        margin-top: var(--gap-element);
      }
    }
  }
}

@include media-sm {
  section {
    margin-top: 20px;
  }
}
</style>
