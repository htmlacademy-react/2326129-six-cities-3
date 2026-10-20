import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { MainPage } from './main-page';
import { createTestStore } from '../../utils/mock-store';
import { createMockOfferPreview } from '../../utils/mocks';
import { OfferPreview } from '../offer-page/types/types';

vi.mock('../../components/map/map', () => ({
  Map: () => <div data-testid="mock-map" />,
}));

const renderPage = (offers: OfferPreview[] = []) => {
  const store = createTestStore({
    app: { city: 'Paris', sorting: 'popular', error: null },
    offers: {
      offers,
      currentOffer: null,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
      isOffersDataLoading: false,
      isOfferLoading: false,
      isCommentLoading: false,
    },
  });

  return render(
    <Provider store={store}>
      <HelmetProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </HelmetProvider>
    </Provider>,
  );
};

const createParisOffer = () =>
  createMockOfferPreview({
    city: { name: 'Paris', location: { latitude: 48.85, longitude: 2.35, zoom: 12 } },
  });

describe('MainPage', () => {
  it('should render 6 city tabs', () => {
    renderPage([]);
    ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].forEach((city) => {
      expect(screen.getByRole('link', { name: city })).toBeInTheDocument();
    });
  });

  it('should render EmptyOffersList when there are no offers', () => {
    renderPage([]);
    expect(screen.getByText(/no places to stay available/i)).toBeInTheDocument();
  });

  it('should render OffersSection when there are offers', () => {
    renderPage([createParisOffer()]);
    expect(screen.getByText(/1 place to stay in Paris/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });

  it('should filter offers by the selected city', () => {
    const parisOffer = createParisOffer();
    const amsterdamOffer = createMockOfferPreview({
      city: { name: 'Amsterdam', location: { latitude: 52, longitude: 4, zoom: 12 } },
    });

    renderPage([parisOffer, amsterdamOffer]);

    expect(screen.getByText(parisOffer.title)).toBeInTheDocument();
    expect(screen.queryByText(amsterdamOffer.title)).not.toBeInTheDocument();
  });
});
