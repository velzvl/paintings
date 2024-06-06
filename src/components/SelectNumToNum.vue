<script setup lang="ts">
import useCustomSelect from '@/hooks/useCustomSelect';
import CustomSelect from '@/shared/CustomSelect.vue';
import Input from '@/shared/Input.vue';
import type { INumToNumValue } from '@/types';
import { reactive } from 'vue';

interface ISelectValuesProps {
  selectPlaceholder: string;
  value: INumToNumValue;
}

const props = defineProps<ISelectValuesProps>();

const emit = defineEmits(['update:value']);

const inputValues = reactive({ from: '', before: '' });

const { customSelectStateRef } = useCustomSelect(inputValues, (state) => {
  state.selected = true;
  emit('update:value', { from: inputValues.from, before: inputValues.before });
  if (inputValues.from.length > 0 && inputValues.before.length > 0) {
    state.placeholder = `${inputValues.from} - ${inputValues.before}`;
    return;
  }
  if (inputValues.from.length > 0) {
    state.placeholder = `${inputValues.from} <`;
    return;
  }
  if (inputValues.before.length > 0) {
    state.placeholder = `< ${inputValues.before}`;
    return;
  }
  state.selected = false;
  state.placeholder = props.selectPlaceholder;
});

const handleSelectCancel = () => {
  emit('update:value', { from: '', before: '' });
  inputValues.from = '';
  inputValues.before = '';
  customSelectStateRef.value.selected = false;
};

</script>

<template>
  <CustomSelect
    @cancel="handleSelectCancel"
    v-model:state="customSelectStateRef"
  >
    <div class="select-values__inputs">
      <Input
        v-model:value="inputValues.from"
        placeholder="from"
        inputType="number"
        inversed
      />
      <div class="select-values__inputs-line" />
      <Input
        v-model:value="inputValues.before"
        placeholder="before"
        inputType="number"
        inversed
      />
    </div>
  </CustomSelect>
</template>

<style lang="scss">

.select-values__inputs {
  display: flex;
  align-items: center;
  padding: 20px;

  &-line {
    height: 1px;
    margin: 0 10px;
    padding: 0 6px;
    background-color: var(--color-border);
  }

  @include media-lg {
    & {
      flex-direction: column;
      padding: 20px 25px;
    }

    &-line {
      margin: 15px 0;
    }

    input {
      max-width: 110px;
    }
  }

  @include media-sm {
    & {
      justify-content: center;
      flex-direction: row;
      padding: 17.5px 20px;
    }

    &-line {
      margin: 0 6px ;
    }
  }
}
</style>
