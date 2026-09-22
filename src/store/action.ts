import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../pages/main-page/const/const';
import { OfferPreview } from '../pages/offer-page/types/types';

export const setCity = createAction<CityName>('city/setCity');

export const loadOffers = createAction<OfferPreview[]>('offers/loadOffers');
