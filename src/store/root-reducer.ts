import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './slices/offers-slice';
import { userReducer } from './slices/user-slice';
import { appReducer } from './slices/app-slice';

export const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  user: userReducer
});
