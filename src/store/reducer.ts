import { AuthorizationStatus, SortingOption } from '../const';
import { CityName } from '../pages/main-page/const/const';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { addComment, loadComments, loadOffer, loadOffers, loadOffersNearby, requiredAuthorization, setCity, setCommentsLoading, setError, setOfferLoading, setOffersDataLoadingStatus, setSorting, setUser } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { UserData } from './auth-data';

type OffersState = {
  city: CityName;
  offers: OfferPreview[];
  currentOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  comments: Review[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  isCommentLoading: boolean;
  error: string | null;
  user: UserData | null;
  sorting: SortingOption;

}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isOfferLoading: false,
  isCommentLoading: false,
  error: null,
  user: null,
  sorting: 'popular'
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
      state.sorting = 'popular';
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
    .addCase(loadOffersNearby, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(setCommentsLoading, (state, action) => {
      state.isCommentLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferLoading, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    });
});

export { reducer };
