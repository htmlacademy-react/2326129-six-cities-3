import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FavoriteCount } from './favorite-count';
import { createTestStore } from '../../../../utils/mock-store';
import { createMockOfferPreview } from '../../../../utils/mocks';

const renderCount = (store = createTestStore()) =>
  render(
    <Provider store={store}>
      <FavoriteCount />
    </Provider>,
  );

describe('FavoriteCount', () => {
  it('should render 0 when there are no favorites', () => {
    renderCount();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render the number of favorite offers', () => {
    const favorites = [
      createMockOfferPreview({ isFavorite: true }),
      createMockOfferPreview({ isFavorite: true }),
      createMockOfferPreview({ isFavorite: true }),
    ];

    const store = createTestStore({
      offers: {
        offers: [],
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        favoriteOffers: favorites,
        isOffersDataLoading: false,
        isOfferLoading: false,
        isCommentLoading: false,
      },
    });

    renderCount(store);
    expect(screen.getByText(String(favorites.length))).toBeInTheDocument();
  });
});
