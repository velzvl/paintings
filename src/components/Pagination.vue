<script lang="ts" setup>
import ArrowIcon from '@/shared/icons/ArrowIcon.vue';
import DoubleArrowIcon from '@/shared/icons/DoubleArrowIcon.vue';
import PaginationButton from '@/shared/PaginationButton.vue';
import { computed } from 'vue';

interface IPaginationProps {
  pages: number | null;
  current: number | null;
}

const props = defineProps<IPaginationProps>();

const emit = defineEmits(['change']);

const pagesNums = computed(() => Array.from(
  { length: props.pages || 0 },
  (value: number, index: number) => index + 1,
));

const handlePageChange = (newPage: number) => {
  if (props.pages && props.current) {
    emit('change', newPage);
  }
};
</script>

<template>
  <section>
    <div class="container">
      <div class="pagination">
        <PaginationButton
          @click="() => handlePageChange(1)"
          :disabled="current === 1"
        >
          <DoubleArrowIcon style="transform: rotate(180deg); " />
        </PaginationButton>
        <PaginationButton
          @click="handlePageChange(current || 0 - 1)"
          :disabled="current === 1"
        >
          <ArrowIcon style="transform: rotate(180deg);" />
        </PaginationButton>
        <PaginationButton
          v-for="page in pagesNums"
          :key="page"
          @click="() => handlePageChange(page)"
          :active="page === current ? true : false"
        >
          {{ page }}
        </PaginationButton>
        <PaginationButton
          @click="() => handlePageChange(current || 0 + 1)"
          :disabled="current === pages"
        >
          <ArrowIcon />
        </PaginationButton>
        <PaginationButton
          @click="() => handlePageChange(pages || 0)"
          :disabled="current === pages"
        >
          <DoubleArrowIcon />
        </PaginationButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

section {
  margin-top: 40px;
  padding-bottom: 97px;

  @include media-lg {
    & {
      padding-bottom: 62px;
    }
  }

  @include media-md {
    & {
      padding-bottom: 54px;
    }
  }

  @include media-sm {
    & {
      padding-bottom: 34px;
    }
  }
}

.pagination {
  display: flex;

  @include media-sm {
    & {
      justify-content: center;
    }
  }
}
</style>
