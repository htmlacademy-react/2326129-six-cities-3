import { userReducer } from './user-slice';
import { AuthorizationStatus } from '../../const';
import { createMockUser } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

describe('userSlice', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual({
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
    });
  });

  it('should set user and Auth on checkAuthAction.fulfilled', () => {
    const user = createMockUser();
    const result = userReducer(undefined, {
      type: checkAuthAction.fulfilled.type,
      payload: user,
    });
    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user null and NoAuth on checkAuthAction.rejected', () => {
    const state = {
      user: createMockUser(),
      authorizationStatus: AuthorizationStatus.Auth,
    };
    const result = userReducer(state, { type: checkAuthAction.rejected.type });
    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set user and Auth on loginAction.fulfilled', () => {
    const user = createMockUser();
    const result = userReducer(undefined, {
      type: loginAction.fulfilled.type,
      payload: user,
    });
    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should reset user on logoutAction.fulfilled', () => {
    const state = {
      user: createMockUser(),
      authorizationStatus: AuthorizationStatus.Auth,
    };
    const result = userReducer(state, { type: logoutAction.fulfilled.type });
    expect(result.user).toBeNull();
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
