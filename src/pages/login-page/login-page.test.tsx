import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { LoginPage } from './login-page';
import { createTestStore } from '../../utils/mock-store';

const renderLoginPage = (store = createTestStore()) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </HelmetProvider>
    </Provider>,
  );

describe('LoginPage', () => {
  it('should render form fields', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should dispatch loginAction on submit', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderLoginPage(store);

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'pass1');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  it('should render random city link', () => {
    renderLoginPage();
    const cityLink = screen.getByRole('link', {
      name: /Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i,
    });
    expect(cityLink).toBeInTheDocument();
  });
});
