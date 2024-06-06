import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IAuthor, IFilters, ILocation, IPaintingClient } from '@/types';
import { store } from '@/stores/idnex';
import paintingsApi from '@/http/paintingsApi';
import getClientPaintings from '@/helpers/getClientPaintings';

export const usePaintingStore = defineStore('painting', () => {
  const filters = reactive<IFilters>({
    name: '',
    author: null,
    location: null,
    created: { from: '', before: '' },
  });
  const paintings = ref<IPaintingClient[]>([]);
  const authors = ref<IAuthor[]>([]);
  const locations = ref<ILocation[]>([]);
  const totalPages = ref<number | null>(null);
  const currentPage = ref<number | null>(null);

  const fetchPaintings = async (
    page: number = 1,
    limit: number = import.meta.env.VITE_PAINTINGS_PAGE_LIMIT,
  ) => {
    paintings.value = [];
    const dataTotalPaintings = await paintingsApi.fetchPaintings(filters);
    const paintingsLength = dataTotalPaintings.length;
    totalPages.value = Math.ceil(paintingsLength / import.meta.env.VITE_PAINTINGS_PAGE_LIMIT) || 1;
    const clientPaintings = await paintingsApi
      .fetchPaintings(filters, page, limit)
      .then((paintings) => getClientPaintings(paintings, authors.value, locations.value));
    paintings.value = clientPaintings;
  };

  const fetchAuthors = async () => {
    const dataAuthors = await paintingsApi.fetchAuthors();
    authors.value = dataAuthors;
  };

  const fetchLocations = async () => {
    const dataLocations = await paintingsApi.fetchLocations();
    locations.value = dataLocations;
  };

  return {
    filters,
    paintings,
    authors,
    locations,
    totalPages,
    currentPage,
    fetchPaintings,
    fetchAuthors,
    fetchLocations,
  };
});

export const usePaintingStoreHook = () => usePaintingStore(store);
