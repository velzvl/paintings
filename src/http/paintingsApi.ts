import getFetchPaintingsParametrs from '@/helpers/getFetchPaintingsParametrs';
import $host from '@/http/index';
import type { IAuthor, IFilters, ILocation, IPainting } from '@/types';

export default {
  async fetchPaintings(filters: IFilters, page?: number, limit?: number) {
    try {
      const { data } = await $host.get(
        `/paintings${getFetchPaintingsParametrs({ filters, page, limit })}`,
      );
      return data as IPainting[];
    } catch (error) {
      return [];
    }
  },
  async fetchAuthors() {
    try {
      const { data } = await $host.get('/authors');
      return data as IAuthor[];
    } catch (error) {
      return [];
    }
  },
  async fetchLocations() {
    try {
      const { data } = await $host.get('/locations');
      return data as ILocation[];
    } catch (error) {
      return [];
    }
  },
};
