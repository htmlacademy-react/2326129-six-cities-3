import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferPreview, Review } from '../../pages/offer-page/types/types';
import {
  changeFavoriteStatusAction,
  fetchCommentsAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  loadFavoriteOffersAction,
  postCommentAction,
} from '../api-actions';

type OffersState = {
  offers: OfferPreview[];
  currentOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  comments: Review[];
  favoriteOffers: OfferPreview[];
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  isCommentLoading: boolean;
};

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
  initialState,
  reducers: {
    disableFavorites: (state) => {
      state.favoriteOffers = [];
      state.offers.forEach((offer) => {
        offer.isFavorite = false;
      });
      state.nearbyOffers.forEach((offer) => {
        offer.isFavorite = false;
      });
      if(state.currentOffer) {
        state.currentOffer.isFavorite = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.currentOffer = null;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.isCommentLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentLoading = false;
        state.comments = [];
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(loadFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        const favoriteIds = new Set(action.payload.map((offer) => offer.id));

        state.offers.forEach((offer) => {
          offer.isFavorite = favoriteIds.has(offer.id);
        });

        state.nearbyOffers.forEach((offer) => {
          offer.isFavorite = favoriteIds.has(offer.id);
        });

        if(state.currentOffer) {
          state.currentOffer.isFavorite = favoriteIds.has(state.currentOffer.id);
        }
      })
      .addCase(loadFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffers = [];
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
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
        const favIndex = state.favoriteOffers.findIndex((o) => o.id === updated.id);
        if (updated.isFavorite) {
          if (favIndex === -1) {
            state.favoriteOffers.push(updated);
          }
        } else if (favIndex !== -1) {
          state.favoriteOffers.splice(favIndex, 1);
        }
      });
  },
});

export const { disableFavorites } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
