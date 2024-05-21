<script setup lang="ts">
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import useCustomSelect from '@/hooks/useCustomSelect';
import CustomSelect from '@/shared/CustomSelect.vue';
import type { ISelectListOption } from '@/types';
import {
  computed,
  ref,
} from 'vue';

interface SelectListProps {
  selectPlaceholder: string;
  value: any;
  list: any[];
  getItemPlaceholder: (item: any) => string;
}

const props = defineProps<SelectListProps>();

const emit = defineEmits(['update:value']);

const currentOption = ref<ISelectListOption | null>(null);
const options = computed<ISelectListOption[]>(() => props.list.map((item, index) => ({
  id: index, value: item,
})));

const { customSelectStateRef } = useCustomSelect(currentOption, (state) => {
  if (currentOption.value) {
    state.placeholder = props.getItemPlaceholder(currentOption.value.value);
    state.selected = true;
    return;
  }
  state.placeholder = props.selectPlaceholder;
  state.selected = false;
});

const handleOptionClick = (option: ISelectListOption) => {
  currentOption.value = option;
  customSelectStateRef.value.open = false;
  emit('update:value', option.value);
};

const handleItemCancel = () => {
  currentOption.value = null;
  emit('update:value', null);
};
</script>

<template>
  <CustomSelect
    @cancel="handleItemCancel"
    v-model:state="customSelectStateRef"
  >
    <div class="select-list">
      <ul class="select-list__list" data-simplebar>
        <li v-for="option in options" :key="option.id" :class="['select-list__item', option.id === currentOption?.id && 'active']">
          <button
            @click="() => handleOptionClick(option)"
            class="select-list__item-button"
            type="button"
          >
            {{ getItemPlaceholder(option.value) }}
          </button>
        </li>
      </ul>
    </div>
  </CustomSelect>
</template>

<style lang="scss">

.select-list {
  position: relative;

  &__list {
    max-height: 350px;
    padding: 10px 0;
    overflow: hidden auto;
  }

  &__item {

    &.active {

      .button {
      color: var(--color-background);
      background-color: var(--color-text);
      }
    }

    &-button {
      position: relative;
      width: 100%;
      padding: 10px 30px;
      text-align: left;
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
      color: var(--color-text);
      transition: .2s all;

      &:hover {
        color: var(--color-background);
        background-color: var(--color-text);
      }
    }
  }

  .simplebar-vertical {
    width: 9px;
    right: 7px;
  }

  .simplebar-scrollbar {
    border-radius: 10px;
    background: var(--color-grey);
    box-shadow: 0px 2px 2px 0px #0000001F;

    &::before {
      display: none;
    }
  }
}
</style>
