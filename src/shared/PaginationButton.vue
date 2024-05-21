<script setup lang="ts">
interface IPaginationButtonProps {
  active?: boolean
  disabled?: boolean
}

withDefaults(defineProps<IPaginationButtonProps>(), {
  active: false,
  disabled: false,
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button
    :class="['pagination__button', active && 'active']"
    type="button"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.pagination__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;
  outline: 1px var(--color-border) solid;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: .2s all;

  &:disabled {
    cursor: default;
    opacity: 30%;

    &:hover {
      background-color: transparent;
    }
  }

  svg {
    fill: var(--color-text);
    transition: .2s all;
  }

  &:hover {
    background-color: var(--color-pagination-button-background);
  }

  &.active {
    color: var(--color-background);
    background-color: var(--color-text);
  }
}
</style>
