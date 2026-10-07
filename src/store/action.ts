import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../pages/main-page/const/const';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { AuthorizationStatus, SortingOption } from '../const';
import { UserData } from './auth-data';

export const setCity = createAction<CityName>('city/setCity');

export const loadOffers = createAction<OfferPreview[]>('offers/loadOffers');

export const loadOffer = createAction<Offer | null>('offer/loadOffer');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingScreen');

export const setOfferLoading = createAction<boolean>('offer/setLoading');

export const requiredAuthorization = createAction<AuthorizationStatus>('user/requiredAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setUser = createAction<UserData | null>('user/setUser');

export const setSorting = createAction<SortingOption>('sorting/setSorting');

export const loadOffersNearby = createAction<OfferPreview[]>('offer/loadOffersNearby');

export const loadComments = createAction<Review[]>('offer/loadComments');

export const addComment = createAction<Review>('offer/addComment');

export const setCommentsLoading = createAction<boolean>('offer/setCommentsLoading');

export const loadFavoriteOffers = createAction<OfferPreview[]>('offer/loadFavorites');

export const updateOfferFavoritesStatus = createAction<OfferPreview>('offer/updateOfferFavoritesStatus');

