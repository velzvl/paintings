import type { IAppElementDataset, THEME_COLORS } from '@/types';

export default (theme: THEME_COLORS): void => {
  const appElement = document.querySelector('#app') as HTMLDivElement;
  const dataset = appElement.dataset as IAppElementDataset;
  dataset.colorTheme = theme;
};
