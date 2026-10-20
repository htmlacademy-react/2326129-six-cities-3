import { AuthorizationStatus } from '../const';
import { State } from '../types/state';

export const selectCity = (state: State) => state.app.city;
export const selectSorting = (state: State) => state.app.sorting;
export const selectError = (state: State) => state.app.error;

export const selectUser = (state: State) => state.user.user;
export const selectAuthorizationStatus = (state: State) => state.user.authorizationStatus;

export const selectOffers = (state: State) => state.offers.offers;
export const selectCurrentOffer = (state: State) => state.offers.currentOffer;
export const selectNearbyOffers = (state: State) => state.offers.nearbyOffers;
export const selectComments = (state: State) => state.offers.comments;
export const selectFavoriteOffers = (state: State) => state.offers.favoriteOffers;
export const selectIsOffersDataLoading = (state: State) => state.offers.isOffersDataLoading;
export const selectIsOfferLoading = (state: State) => state.offers.isOfferLoading;
export const selectIsCommentLoading = (state: State) => state.offers.isCommentLoading;
export const selectIsAuthorized = (state: State) =>
  state.user.authorizationStatus === AuthorizationStatus.Auth;
export const selectFavoriteCount = (state: State) => state.offers.favoriteOffers.length;
