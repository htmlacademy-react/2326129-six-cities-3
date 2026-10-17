import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

type RenderOptions = {
  authStatus: AuthorizationStatus;
  isReverse?: boolean;
};

const renderRoute = ({ authStatus, isReverse = false }: RenderOptions) =>
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route
          path="/protected"
          element={
            <PrivateRoute authorizationStatus={authStatus} isReverse={isReverse}>
              <div>Protected content</div>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/" element={<div>Main page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe('PrivateRoute', () => {
  it('should render children when authorized', () => {
    renderRoute({ authStatus: AuthorizationStatus.Auth });
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('should redirect to /login when not authorized', () => {
    renderRoute({ authStatus: AuthorizationStatus.NoAuth });
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render children when not authorized and isReverse', () => {
    renderRoute({ authStatus: AuthorizationStatus.NoAuth, isReverse: true });
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('should redirect authorized user to "/" when isReverse', () => {
    renderRoute({ authStatus: AuthorizationStatus.Auth, isReverse: true });
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should redirect Unknown status to /login', () => {
    renderRoute({ authStatus: AuthorizationStatus.Unknown });
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
