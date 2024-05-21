<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { ICustomSelectStateRef } from '@/types';
import DropdownIcon from './icons/DropdownIcon.vue';
import CrossIcon from './icons/CrossIcon.vue';

interface CustomSelectProps {
  state: ICustomSelectStateRef
}

const props = defineProps<CustomSelectProps>();

const emit = defineEmits(['update:state', 'cancel']);

const selectPlaceholderRef = ref<HTMLDivElement>();
const selectPlaceholderTextRef = ref<HTMLTimeElement>();
const selectIconsRef = ref<HTMLDivElement>();

const handleClick = (): void => {
  emit('update:state', { ...props.state, open: !props.state.open });
};

const handleOptionCancel = (): void => {
  emit('update:state', { ...props.state, selected: false });
  emit('cancel');
};

const checkPlaceholderLength = () => {
  if (selectPlaceholderRef.value!.offsetWidth - (selectIconsRef.value!.offsetWidth + 40)
  <= selectPlaceholderTextRef.value!.offsetWidth) {
    while (selectPlaceholderRef.value!.offsetWidth - (selectIconsRef.value!.offsetWidth + 40)
  <= selectPlaceholderTextRef.value!.offsetWidth) {
    selectPlaceholderTextRef.value!.textContent = selectPlaceholderTextRef.value!.textContent!.slice(0, -4).concat('...');
    }
  }
};

const handleResizeWindow = () => {
  selectPlaceholderTextRef.value!.textContent = props.state.placeholder;
  checkPlaceholderLength();
};

watch(() => props.state.placeholder, () => {
  setTimeout(() => {
    checkPlaceholderLength();
  }, 0);
});

onMounted(() => {
  window.addEventListener('resize', handleResizeWindow);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResizeWindow);
});
</script>

<template>
  <div
    :class="['select', state.open && 'open']"
  >
    <button
      ref="selectPlaceholderRef"
      @click="handleClick"
      class="select__button"
      type="button"
    >
      <p
        ref="selectPlaceholderTextRef"
        class="select__button-placeholder"
      >
        {{ state.placeholder }}
      </p>
      <div
        ref="selectIconsRef"
        class="select__button-icons"
      >
        <button
          v-if="state.selected"
          @click.stop="handleOptionCancel"
          class="select__button-close"
          type="button"
        >
          <CrossIcon />
        </button>
        <DropdownIcon class="select__button-dropdown" />
      </div>
    </button>
    <div class="select__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.select {
  position: relative;

  &__button {
    @include element-border;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    &-placeholder {
      @include element-text;
      text-align: left;
      white-space: nowrap;
    }

    &-icons {
      display: flex;
      align-items: center;
    }

    &-close {
      display: flex;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        bottom: -10px;
        right: -10px;
      }
    }

    &-dropdown {
      fill: var(--color-text);
      margin-left: 10px;
    }
  }

  &__content {
    @include element-border;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0;
    border-top: 1px var(--color-border-translucent) solid;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: var(--color-background);
  }
}

.select.open {
  z-index: 10;

  .select__button {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &-dropdown {
      transform: rotate(180deg);
    }
  }

  .select__content {
    display: block;
  }
}
</style>
