import { CityName } from './pages/main-page/const/const';

export const TIMEOUT_SHOW_ERROR = 2000;

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

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Comments = '/comments',
  Favorite = '/favorite'
}

export const CITY_LOCATIONS: Record<CityName, { latitude: number; longitude: number; zoom: number }> = {
  Paris: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
  Cologne: { latitude: 50.938361, longitude: 6.959974, zoom: 12 },
  Brussels: { latitude: 50.846557, longitude: 4.351697, zoom: 12 },
  Amsterdam: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
  Hamburg: { latitude: 53.550341, longitude: 10.000654, zoom: 12 },
  Dusseldorf: { latitude: 51.225402, longitude: 6.776314, zoom: 12 },
};

export const enum RequestStatus{ Idle, Loading, Success, Failed }

