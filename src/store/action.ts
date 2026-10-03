import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../pages/main-page/const/const';
import { Offer, OfferPreview } from '../pages/offer-page/types/types';
import { AuthorizationStatus } from '../const';
import { UserData } from './auth-data';

export const setCity = createAction<CityName>('city/setCity');

export const loadOffers = createAction<OfferPreview[]>('offers/loadOffers');

export const loadOffer = createAction<Offer | null>('offer/loadOffer');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingScreen');

export const setOfferLoading = createAction<boolean>('offer/setLoading');

export const requiredAuthorization = createAction<AuthorizationStatus>('user/requiredAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setUser = createAction<UserData | null>('user/setUser');
