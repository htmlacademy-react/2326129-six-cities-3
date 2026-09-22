export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export const rating = [
  {value: 5, label: 'perferct'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'},
];

export const SORTING_OPTIONS = [
  {label: 'Popular', value: 'popular'},
  {label: 'Price: low to high', value: 'price-low'},
  {label: 'Price: high to low', value: 'price-high'},
  {label: 'Top rated first', value: 'top-rated'},
];

export type SortingOption = typeof SORTING_OPTIONS[number]['value'];

