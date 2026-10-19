import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { Layout } from './layout';
import { createTestStore } from '../../utils/mock-store';
import { createMockUser } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';

const renderLayout = (authStatus: AuthorizationStatus, user: UserData | null = null) =>
  render(
    <Provider store={createTestStore({
      user: { user, authorizationStatus: authStatus },
    })}
    >
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

describe('Layout', () => {
  it('should render Sign in for unauthenticated user', () => {
    renderLayout(AuthorizationStatus.NoAuth);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render email and Sign out for authenticated user', () => {
    const user = createMockUser();
    renderLayout(AuthorizationStatus.Auth, user);
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should dispatch logout on Sign out click', async () => {
    const user = userEvent.setup();
    const mockUser = createMockUser();
    const store = createTestStore({
      user: { user: mockUser, authorizationStatus: AuthorizationStatus.Auth },
    });
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<div />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await user.click(screen.getByText('Sign out'));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
