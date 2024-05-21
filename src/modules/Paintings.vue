<script setup lang="ts">
import Painting from '@/components/Painting.vue';
import { usePaintingStore } from '@/stores/modules/painting';

const paintingStore = usePaintingStore();
</script>

<template>
  <section>
    <div class="container">
      <ul class="paintings">
        <li
          v-for="painting in paintingStore.paintings"
          class="paintings__item"
          :key="painting.id"
        >
          <Painting :info="painting" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

section {
  flex: 1 1 auto;
}

.paintings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--gap-element);

  &__item {
    display: flex;
  }

  @include media-md {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include media-sm {
    & {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

@include media-sm {
  section {
    margin-top: 45px;
  }
}
</style>
