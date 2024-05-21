export enum THEME_COLORS {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IAppElementDataset extends DOMStringMap {
  colorTheme: THEME_COLORS;
}

export interface ISelectListOption {
  id: number;
  value: any;
}

export interface ICustomSelectStateRef {
  placeholder: string;
  selected: boolean;
  open: boolean;
}

export interface INumToNumValue {
  from: string;
  before: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  location: string;
}

export interface IPainting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface IPaintingClient {
  author: IAuthor | null;
  created: string;
  id: number;
  image: HTMLImageElement;
  location: ILocation | null;
  name: string;
}

export interface IFilters {
  name: string;
  author: IAuthor | null;
  location: ILocation | null;
  created: INumToNumValue;
}
