import { vi } from 'vitest';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchCommentsAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  loadFavoriteOffersAction,
  loginAction,
  logoutAction,
  postCommentAction,
} from './api-actions';
import { createMockApi, createTestStore } from '../utils/mock-store';
import {
  createMockOffer,
  createMockOfferPreview,
  createMockReview,
  createMockUser,
} from '../utils/mocks';
import { AuthorizationStatus } from '../const';

describe('api-actions', () => {
  describe('fetchOffersAction', () => {
    it('should fetch offers', async () => {
      const api = createMockApi();
      const offers = [createMockOfferPreview()];
      vi.mocked(api.get).mockResolvedValueOnce({ data: offers });
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchOffersAction());

      expect(api.get).toHaveBeenCalledWith('/offers');
      expect(store.getState().offers.offers).toEqual(offers);
      expect(store.getState().offers.isOffersDataLoading).toBe(false);
    });

    it('should toggle loading during request', async () => {
      const api = createMockApi();
      vi.mocked(api.get).mockResolvedValueOnce({ data: [] });
      const store = createTestStore(undefined, api);

      const promise = store.dispatch(fetchOffersAction());
      expect(store.getState().offers.isOffersDataLoading).toBe(true);
      await promise;
      expect(store.getState().offers.isOffersDataLoading).toBe(false);
    });

    it('should reset loading on rejection', async () => {
      const api = createMockApi();
      vi.mocked(api.get).mockRejectedValueOnce(new Error('Network'));
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchOffersAction());

      expect(store.getState().offers.isOffersDataLoading).toBe(false);
    });
  });

  describe('fetchOfferByIdAction', () => {
    it('should put offer into currentOffer', async () => {
      const api = createMockApi();
      const offer = createMockOffer();
      vi.mocked(api.get).mockResolvedValueOnce({ data: offer });
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchOfferByIdAction(offer.id));

      expect(api.get).toHaveBeenCalledWith(`/offers/${offer.id}`);
      expect(store.getState().offers.currentOffer).toEqual(offer);
    });

    it('should set currentOffer=null on failure', async () => {
      const api = createMockApi();
      vi.mocked(api.get).mockRejectedValueOnce(new Error('404'));
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchOfferByIdAction('missing'));

      expect(store.getState().offers.currentOffer).toBeNull();
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should put nearby offers', async () => {
      const api = createMockApi();
      const nearby = [createMockOfferPreview()];
      vi.mocked(api.get).mockResolvedValueOnce({ data: nearby });
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchOffersNearbyAction('offer-1'));

      expect(api.get).toHaveBeenCalledWith('/offers/offer-1/nearby');
      expect(store.getState().offers.nearbyOffers).toEqual(nearby);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should put comments', async () => {
      const api = createMockApi();
      const comments = [createMockReview()];
      vi.mocked(api.get).mockResolvedValueOnce({ data: comments });
      const store = createTestStore(undefined, api);

      await store.dispatch(fetchCommentsAction('offer-1'));

      expect(api.get).toHaveBeenCalledWith('/comments/offer-1');
      expect(store.getState().offers.comments).toEqual(comments);
    });
  });

  describe('postCommentAction', () => {
    it('should append comment', async () => {
      const api = createMockApi();
      const review = createMockReview();
      vi.mocked(api.post).mockResolvedValueOnce({ data: review });
      const store = createTestStore(undefined, api);

      await store.dispatch(postCommentAction({
        offerId: 'offer-1',
        comment: review.comment,
        rating: review.rating,
      }));

      expect(api.post).toHaveBeenCalledWith('/comments/offer-1', {
        comment: review.comment,
        rating: review.rating,
      });
      expect(store.getState().offers.comments).toContainEqual(review);
    });
  });

  describe('loadFavoriteOffersAction', () => {
    it('should put favorites', async () => {
      const api = createMockApi();
      const favorites = [createMockOfferPreview({ isFavorite: true })];
      vi.mocked(api.get).mockResolvedValueOnce({ data: favorites });
      const store = createTestStore(undefined, api);

      await store.dispatch(loadFavoriteOffersAction());

      expect(api.get).toHaveBeenCalledWith('/favorite');
      expect(store.getState().offers.favoriteOffers).toEqual(favorites);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should update favorites on success', async () => {
      const api = createMockApi();
      const updated = createMockOfferPreview({ isFavorite: true });
      vi.mocked(api.post).mockResolvedValueOnce({ data: updated });
      const store = createTestStore(undefined, api);

      await store.dispatch(changeFavoriteStatusAction({
        offerId: updated.id,
        status: 1,
      }));

      expect(api.post).toHaveBeenCalledWith(`/favorite/${updated.id}/1`);
      expect(store.getState().offers.favoriteOffers).toContainEqual(updated);
    });
  });

  describe('checkAuthAction', () => {
    it('should set user and Auth on success', async () => {
      const api = createMockApi();
      const user = createMockUser();
      vi.mocked(api.get).mockResolvedValueOnce({ data: user });
      const store = createTestStore(undefined, api);

      await store.dispatch(checkAuthAction());

      expect(store.getState().user.user).toEqual(user);
      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.Auth);
    });

    it('should set NoAuth on failure', async () => {
      const api = createMockApi();
      vi.mocked(api.get).mockRejectedValueOnce(new Error('401'));
      const store = createTestStore(undefined, api);

      await store.dispatch(checkAuthAction());

      expect(store.getState().user.user).toBeNull();
      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('loginAction', () => {
    it('should set user and Auth', async () => {
      const api = createMockApi();
      const user = createMockUser();
      vi.mocked(api.post).mockResolvedValueOnce({ data: user });
      const store = createTestStore(undefined, api);

      await store.dispatch(loginAction({
        login: 'test@example.com',
        password: 'pass1',
      }));

      expect(api.post).toHaveBeenCalledWith('/login', {
        email: 'test@example.com',
        password: 'pass1',
      });
      expect(store.getState().user.user).toEqual(user);
      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.Auth);
    });
  });

  describe('logoutAction', () => {
    it('should reset user and set NoAuth', async () => {
      const api = createMockApi();
      vi.mocked(api.delete).mockResolvedValueOnce({ data: undefined });
      const store = createTestStore(undefined, api);

      await store.dispatch(logoutAction());

      expect(api.delete).toHaveBeenCalledWith('/logout');
      expect(store.getState().user.user).toBeNull();
      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });
});
