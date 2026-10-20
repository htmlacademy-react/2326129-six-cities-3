import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { FavoritesPage } from './favorites-page';
import { createMockApi, createTestStore } from '../../utils/mock-store';
import { createMockOfferPreview } from '../../utils/mocks';
import { OfferPreview } from '../offer-page/types/types';

const renderPage = (favoriteOffers: OfferPreview[] = []) => {
  const api = createMockApi();
  vi.mocked(api.get).mockResolvedValueOnce({ data: favoriteOffers });

  const store = createTestStore(
    {
      offers: {
        offers: [],
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        favoriteOffers,
        isOffersDataLoading: false,
        isOfferLoading: false,
        isCommentLoading: false,
      },
    },
    api,
  );

  return render(
    <Provider store={store}>
      <HelmetProvider>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </HelmetProvider>
    </Provider>,
  );
};

describe('FavoritesPage', () => {
  it('should render empty state when no favorites', () => {
    renderPage([]);
    expect(screen.getByText(/nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render "Saved listing" title when there are favorites', () => {
    renderPage([createMockOfferPreview()]);
    expect(screen.getByText(/saved listing/i)).toBeInTheDocument();
  });

  it('should group offers by city', () => {
    const parisOffer = createMockOfferPreview({
      city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } },
    });
    const amsterdamOffer = createMockOfferPreview({
      city: { name: 'Amsterdam', location: { latitude: 52, longitude: 4, zoom: 12 } },
    });

    renderPage([parisOffer, amsterdamOffer]);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should render one FavoritesList per city', () => {
    const offers = [
      createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } }),
      createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } }),
      createMockOfferPreview({ city: { name: 'Brussels', location: { latitude: 50, longitude: 4, zoom: 12 } } }),
    ];

    const { container } = renderPage(offers);
    // 2 города → 2 списка
    expect(container.querySelectorAll('.favorites__locations-items')).toHaveLength(2);
  });
});
