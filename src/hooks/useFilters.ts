import type { IFilters } from '@/types';
import { inject } from 'vue';

export default (): IFilters => inject<IFilters>('filters')!;
