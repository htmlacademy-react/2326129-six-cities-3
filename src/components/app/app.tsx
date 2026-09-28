import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '../layout/layout';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { favorites } from '../../mocks';
import { useAppSelector } from '../../hooks/store';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

const MainPage = lazy(() => import('../../pages/main-page/main-page')
  .then((module) => ({ default: module.MainPage })));

const FavoritesPage = lazy(() => import('../../pages/favorites-page/favorites-page')
  .then((module) => ({ default: module.FavoritesPage })));

const LoginPage = lazy(() => import('../../pages/login-page/login-page')
  .then((module) => ({ default: module.LoginPage })));

const OfferPage = lazy(() => import('../../pages/offer-page/offer-page')
  .then((module) => ({ default: module.OfferPage })));

const PageNotFound = lazy(() => import('../../pages/page-not-found/page-not-found')
  .then((module) => ({ default: module.PageNotFound })));

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  // const authorizationStatus = getAuthorizationStatus();
  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={AppRoute.Root} element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route
                path={AppRoute.Favorites}
                element={
                  <PrivateRoute authorizationStatus={authorizationStatus}>
                    <FavoritesPage offers={favorites} />
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.Offer} element={<OfferPage />} />
              <Route
                path={AppRoute.Login}
                element={(
                  <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                    <LoginPage />
                  </PrivateRoute>
                )}
              />
              <Route path="*" element={<PageNotFound type="page" />} />
            </Route>
          </Routes>
        </Suspense>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
