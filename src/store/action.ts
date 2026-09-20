import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../pages/main-page/const/const';

export const setCity = createAction<CityName>('city/setCity');
export const setActiveOfferId = createAction<string | null>('offers/setActiveOfferId');
