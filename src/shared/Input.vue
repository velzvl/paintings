<script setup lang="ts">
import { ref, watch } from 'vue';

interface IInputProps {
  placeholder: string;
  inversed?: boolean;
  inputType?: string;
  value: string
}

const props = withDefaults(defineProps<IInputProps>(), {
  inputType: 'text',
});

const emit = defineEmits(['update:value']);

const inputRef = ref<HTMLInputElement>();
const timer = ref<any>();

const handleInputChange = (event: Event): void => {
  clearTimeout(timer.value);
  const input = {
    value: (event.target as HTMLInputElement).value || '',
  };
  const isNumInput = props.inputType === 'number';
  if (isNumInput) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  inputRef.value.value = input.value;
  timer.value = setTimeout(() => {
    emit('update:value', input.value);
  }, 1000);
};

watch(() => props.value, () => {
  inputRef.value.value = props.value;
});
</script>

<template>
  <label class="label" for="input">Label</label>
  <input
    ref="inputRef"
    :class="['input', inversed && 'inversed']"
    id="input"
    @input="handleInputChange"
    :placeholder="placeholder"
  >
</template>

<style scoped lang="scss">

.label {
  display: none;
}

.input {
  @include element-border;
  @include element-text;
  width: 100%;
  padding: var(--padding-element);

  &::placeholder {
    color: var(--color-placeholder);
  }

  &.inversed {
    border: 0;
    color: var(--color-black);
    background-color: var(--color-element-background-secondary);

    &::placeholder {
      color: var(--color-black-translucent);
    }
  }
}
</style>
