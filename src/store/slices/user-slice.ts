import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../auth-data';

type UserState = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    requiredAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser, requiredAuthorization } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
