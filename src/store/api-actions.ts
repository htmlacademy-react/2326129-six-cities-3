import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { addComment, loadComments, loadOffer, loadOffers, loadOffersNearby, requiredAuthorization, setError, setOfferLoading, setOffersDataLoadingStatus, setUser } from './action';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData, UserData } from './auth-data';
import { dropToken, saveToken } from '../services/token';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchOfferByIdAction = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/fetchOfferById',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoading(true));
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOffer(data));
    } catch {
      dispatch(loadOffer(null));
    } finally {
      dispatch(setOfferLoading(false));
    }
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<
void,
string,
{ dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/fetchOffersNearby',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      dispatch(loadOffersNearby(data));
    } catch {
      dispatch(loadOffersNearby([]));
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<
void,
string,
{ dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/fetchComments',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch {
      dispatch(loadComments([]));
    }
  }
);

export const postCommentAction = createAsyncThunk<
void,
{offerId: string; comment: string; rating: number},
{dispatch: AppDispatch; state: State; extra: AxiosInstance}
>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    dispatch(addComment(data));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requiredAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUser(null));
      dispatch(requiredAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requiredAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requiredAuthorization(AuthorizationStatus.NoAuth));
  }
);
