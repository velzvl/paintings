import type { IFilters } from '@/types';

interface IGetFetchPaintingsParametrsArgs {
  filters: IFilters;
  page?: number | null;
  limit?: number | null;
}

export default (parametrs: IGetFetchPaintingsParametrsArgs): string => {
  const parametrsString = {
    value: '?',
  };
  if (parametrs.page) {
    parametrsString.value = parametrsString.value.concat(`&_page=${parametrs.page}`);
  }
  if (parametrs.limit) {
    parametrsString.value = parametrsString.value.concat(`&_limit=${parametrs.limit}`);
  }
  if (parametrs.filters.name.length > 0) {
    parametrsString.value = parametrsString.value.concat(`&q=${parametrs.filters.name}`);
  }
  if (parametrs.filters.author) {
    parametrsString.value = parametrsString.value.concat(
      `&authorId=${parametrs.filters.author.id}`,
    );
  }
  if (parametrs.filters.location) {
    parametrsString.value = parametrsString.value.concat(
      `&locationId=${parametrs.filters.location.id}`,
    );
  }
  if (parametrs.filters.created.from.length > 0) {
    parametrsString.value = parametrsString.value.concat(
      `&created_gte=${parametrs.filters.created.from}`,
    );
  }
  if (parametrs.filters.created.before.length > 0) {
    parametrsString.value = parametrsString.value.concat(
      `&created_lte=${parametrs.filters.created.before}`,
    );
  }
  return parametrsString.value;
};
