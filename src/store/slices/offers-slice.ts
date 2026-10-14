import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, OfferPreview, Review } from '../../pages/offer-page/types/types';

type OffersState = {
  offers: OfferPreview[];
  currentOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  comments: Review[];
  favoriteOffers: OfferPreview[];
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  isCommentLoading: boolean;
}

const initialState: OffersState = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  isOfferLoading: false,
  isCommentLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferPreview[]>) => {
      state.offers = action.payload;
    },
    loadOffer: (state, action: PayloadAction<Offer | null>) => {
      state.currentOffer = action.payload;
    },
    loadOffersNearby: (state, action: PayloadAction<OfferPreview[]>) => {
      state.nearbyOffers = action.payload;
    },
    loadComments: (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.comments.push(action.payload);
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCommentLoading = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.isOfferLoading = action.payload;
    },
    loadFavoriteOffers: (state, action: PayloadAction<OfferPreview[]>) => {
      state.favoriteOffers = action.payload;
    },
    updateOfferFavoritesStatus: (state, action: PayloadAction<OfferPreview>) => {
      const updated = action.payload;

      const offer = state.offers.find((o) => o.id === updated.id);
      if (offer) {
        offer.isFavorite = updated.isFavorite;
      }

      const nearby = state.nearbyOffers.find((o) => o.id === updated.id);
      if (nearby) {
        nearby.isFavorite = updated.isFavorite;
      }

      if (state.currentOffer && state.currentOffer.id === updated.id) {
        state.currentOffer.isFavorite = updated.isFavorite;
      }

      const favoriteIndex = state.favoriteOffers.findIndex((o) => o.id === updated.id);
      if (updated.isFavorite) {
        if (favoriteIndex === -1) {
          state.favoriteOffers.push(updated);
        }
      } else if (favoriteIndex !== -1) {
        state.favoriteOffers.splice(favoriteIndex, 1);
      }
    },
  },
});

export const {
  loadOffers,
  loadOffer,
  loadOffersNearby,
  loadComments,
  addComment,
  setCommentsLoading,
  setOffersDataLoadingStatus,
  setOfferLoading,
  loadFavoriteOffers,
  updateOfferFavoritesStatus,
} = offersSlice.actions;

export const offersReducer = offersSlice.reducer;
