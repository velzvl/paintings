import getFetchPaintingsParametrs from '@/helpers/getFetchPaintingsParametrs';
import $host from '@/http/index';
import type { IAuthor, IFilters, ILocation, IPainting } from '@/types';

export default {
  async fetchPaintings(filters: IFilters, page: number, limit: number) {
    const { data } = await $host.get(
      `/paintings${getFetchPaintingsParametrs({ filters, page, limit })}`,
    );
    return data as IPainting[];
  },
  async fetchAuthors() {
    const { data } = await $host.get('/authors');
    return data as IAuthor[];
  },
  async fetchLocations() {
    const { data } = await $host.get('/locations');
    return data as ILocation[];
  },
  async countTotalPaintings(filters: IFilters) {
    const { data } = await $host.get(`/paintings${getFetchPaintingsParametrs({ filters })}`);
    return (data as IPainting[]).length;
  },
};
