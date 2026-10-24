import { offersReducer, favoritesDismissal } from './offers-slice';
import {
  createMockOffer,
  createMockOfferPreview,
  createMockReview,
} from '../../utils/mocks';
import {
  changeFavoriteStatusAction,
  fetchCommentsAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  loadFavoriteOffersAction,
  postCommentAction,
} from '../api-actions';

const initial = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  isOfferLoading: false,
  isCommentLoading: false,
};

describe('offersSlice', () => {
  it('should return initial state', () => {
    expect(offersReducer(undefined, { type: '' })).toEqual(initial);
  });

  describe('fetchOffersAction', () => {
    it('should set loading=true on pending', () => {
      const result = offersReducer(undefined, { type: fetchOffersAction.pending.type });
      expect(result.isOffersDataLoading).toBe(true);
    });

    it('should set offers and loading=false on fulfilled', () => {
      const offers = [createMockOfferPreview(), createMockOfferPreview()];
      const result = offersReducer(undefined, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers,
      });
      expect(result.offers).toEqual(offers);
      expect(result.isOffersDataLoading).toBe(false);
    });

    it('should reset loading on rejected', () => {
      const state = { ...initial, isOffersDataLoading: true };
      const result = offersReducer(state, { type: fetchOffersAction.rejected.type });
      expect(result.isOffersDataLoading).toBe(false);
    });
  });

  describe('fetchOfferByIdAction', () => {
    it('should set currentOffer on fulfilled', () => {
      const offer = createMockOffer();
      const result = offersReducer(undefined, {
        type: fetchOfferByIdAction.fulfilled.type,
        payload: offer,
      });
      expect(result.currentOffer).toEqual(offer);
      expect(result.isOfferLoading).toBe(false);
    });

    it('should set currentOffer=null on rejected', () => {
      const result = offersReducer(undefined, {
        type: fetchOfferByIdAction.rejected.type,
      });
      expect(result.currentOffer).toBeNull();
    });
  });

  it('should set nearbyOffers on fetchOffersNearbyAction.fulfilled', () => {
    const nearby = [createMockOfferPreview()];
    const result = offersReducer(undefined, {
      type: fetchOffersNearbyAction.fulfilled.type,
      payload: nearby,
    });
    expect(result.nearbyOffers).toEqual(nearby);
  });

  it('should set comments on fetchCommentsAction.fulfilled', () => {
    const comments = [createMockReview(), createMockReview()];
    const result = offersReducer(undefined, {
      type: fetchCommentsAction.fulfilled.type,
      payload: comments,
    });
    expect(result.comments).toEqual(comments);
  });

  it('should append comment on postCommentAction.fulfilled', () => {
    const existing = createMockReview();
    const added = createMockReview();
    const state = { ...initial, comments: [existing] };
    const result = offersReducer(state, {
      type: postCommentAction.fulfilled.type,
      payload: added,
    });
    expect(result.comments).toHaveLength(2);
    expect(result.comments[1]).toEqual(added);
  });

  it('should set favoriteOffers on loadFavoriteOffersAction.fulfilled', () => {
    const favorites = [createMockOfferPreview({ isFavorite: true })];
    const result = offersReducer(undefined, {
      type: loadFavoriteOffersAction.fulfilled.type,
      payload: favorites,
    });
    expect(result.favoriteOffers).toEqual(favorites);
  });

  it('should reset favorites on loadFavoriteOffersAction.rejected', () => {
    const state = { ...initial, favoriteOffers: [createMockOfferPreview()] };
    const result = offersReducer(state, {
      type: loadFavoriteOffersAction.rejected.type,
    });
    expect(result.favoriteOffers).toEqual([]);
  });

  describe('changeFavoriteStatusAction.fulfilled', () => {
    it('should add to favorites when isFavorite=true', () => {
      const offer = createMockOfferPreview({ isFavorite: false });
      const updated = { ...offer, isFavorite: true };
      const state = {
        ...initial,
        offers: [offer],
        currentOffer: createMockOffer({ id: offer.id, isFavorite: false }),
        nearbyOffers: [offer],
      };
      const result = offersReducer(state, {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: updated,
      });

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.nearbyOffers[0].isFavorite).toBe(true);
      expect(result.currentOffer?.isFavorite).toBe(true);
      expect(result.favoriteOffers).toHaveLength(1);
      expect(result.favoriteOffers[0].id).toBe(offer.id);
    });

    it('should remove from favorites when isFavorite=false', () => {
      const offer = createMockOfferPreview({ isFavorite: true });
      const updated = { ...offer, isFavorite: false };
      const state = {
        ...initial,
        offers: [offer],
        favoriteOffers: [offer],
      };
      const result = offersReducer(state, {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: updated,
      });

      expect(result.favoriteOffers).toHaveLength(0);
      expect(result.offers[0].isFavorite).toBe(false);
    });
  });

  it('should clear favorites and flags on logout', () => {
    const offer = createMockOfferPreview({ isFavorite: true });
    const current = createMockOffer({ isFavorite: true });
    const state = {
      ...initial,
      offers: [offer],
      currentOffer: current,
      nearbyOffers: [offer],
      favoriteOffers: [offer],
    };
    const result = offersReducer(state, favoritesDismissal());

    expect(result.favoriteOffers).toHaveLength(0);
    expect(result.offers[0].isFavorite).toBe(false);
    expect(result.nearbyOffers[0].isFavorite).toBe(false);
    expect(result.currentOffer?.isFavorite).toBe(false);
  });
});
