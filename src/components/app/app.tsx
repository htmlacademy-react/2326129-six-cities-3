import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainScreen } from '../../pages/main-page/main-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { Layout } from '../layout/layout';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

function App(): JSX.Element {
  const offersCount = 5;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainScreen offersCount={offersCount} />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="offer">
            <Route index element={<OfferPage />} />
            <Route path=":id" element={<OfferPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App ;
