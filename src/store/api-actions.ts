import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData, UserData } from '../types/user';
import { dropToken, saveToken } from '../services/token';
import { errorNotification } from './slices/app-slice';

export const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch }
>(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(errorNotification(null)), TIMEOUT_SHOW_ERROR);
  },
);

export const fetchOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferByIdAction = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>(
  'data/fetchOfferById',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<
  OfferPreview[],
  string,
  { extra: AxiosInstance }
>(
  'data/fetchOffersNearby',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(
      `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
    );
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'data/fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const postCommentAction = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'data/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      { comment, rating }
    );
    return data;
  }
);

export const loadFavoriteOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  { extra: AxiosInstance }
>(
  'offer/loadFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Favorite);
    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<
  OfferPreview,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance }
>(
  'offer/changeFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<OfferPreview>(
      `${APIRoute.Favorite}/${offerId}/${status}`
    );
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ login: email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(loadFavoriteOffersAction());
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
