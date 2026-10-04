import { AuthorizationStatus, SortingOption } from '../const';
import { CityName } from '../pages/main-page/const/const';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { addComment, loadComments, loadFavoriteOffers, loadOffer, loadOffers, loadOffersNearby, requiredAuthorization, setCity, setCommentsLoading, setError, setOfferLoading, setOffersDataLoadingStatus, setSorting, setUser, updateOfferFavoritesStatus } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { UserData } from './auth-data';

type OffersState = {
  city: CityName;
  offers: OfferPreview[];
  currentOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  comments: Review[];
  favoriteOffers: OfferPreview[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  isCommentLoading: boolean;
  isOfferFavorite: boolean;
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
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isOfferLoading: false,
  isCommentLoading: false,
  isOfferFavorite: false,
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
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(updateOfferFavoritesStatus, (state, action) => {
      const updated = action.payload;
      const offerIndex = state.offers.findIndex((o) => o.id === updated.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex] = updated;
      }

      const nearbyIndex = state.nearbyOffers.findIndex((o) => o.id === updated.id);
      if (nearbyIndex !== -1) {
        state.nearbyOffers[nearbyIndex] = updated;
      }

      if (state.currentOffer && state.currentOffer.id === updated.id) {
        state.currentOffer = { ...state.currentOffer, ...updated};
      }

      const favoriteIndex = state.favoriteOffers.findIndex((o) => o.id === updated.id);
      if(updated.isFavorite) {
        if(favoriteIndex === -1) {
          state.favoriteOffers.push(updated);
        } else {
          state.favoriteOffers[favoriteIndex] = updated;
        }
      } else if (favoriteIndex !== -1) {
        state.favoriteOffers.splice(favoriteIndex, 1);
      }
    });
});

export { reducer };
