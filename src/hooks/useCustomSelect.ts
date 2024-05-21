import { watch, ref, onMounted } from 'vue';
import { type Ref } from 'vue';
import type { ICustomSelectStateRef } from '@/types';

export default (model: Ref | object, onSelect: (state: ICustomSelectStateRef) => void) => {
  const customSelectStateRef = ref<ICustomSelectStateRef>({
    placeholder: '',
    selected: false,
    open: false,
  });

  watch(model, () => onSelect(customSelectStateRef.value));

  onMounted(() => {
    onSelect(customSelectStateRef.value);
  });

  return { customSelectStateRef };
};
