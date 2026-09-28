import { AuthorizationStatus } from '../const';
import { CityName } from '../pages/main-page/const/const';
import { Offer, OfferPreview } from '../pages/offer-page/types/types';
import { loadOffer, loadOffers, requiredAuthorization, setCity, setError, setOfferLoading, setOffersDataLoadingStatus } from './action';
import { createReducer } from '@reduxjs/toolkit';

type OffersState = {
  city: CityName;
  offers: OfferPreview[];
  currentOffer: Offer | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isOfferLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(requiredAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferLoading, (state, action) => {
      state.isOfferLoading = action.payload;
    });
});

export { reducer };
