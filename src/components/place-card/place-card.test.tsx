import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PlaceCard } from './place-card';
import { createTestStore } from '../../utils/mock-store';
import { createMockOfferPreview } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

type RenderOptions = {
  variant?: 'cities' | 'favorites' | 'nearby';
  authStatus?: AuthorizationStatus;
};

const renderCard = (
  offer = createMockOfferPreview(),
  { variant = 'cities', authStatus = AuthorizationStatus.NoAuth }: RenderOptions = {},
) => {
  const store = createTestStore({
    user: { user: null, authorizationStatus: authStatus },
  });

  return {
    offer,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<PlaceCard offer={offer} variant={variant} />} />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  };
};

describe('PlaceCard', () => {
  it('should render title, price, type', () => {
    const { offer } = renderCard();

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    const capitalizedType = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);
    expect(screen.getByText(capitalizedType)).toBeInTheDocument();
  });

  it('should render Premium when isPremium', () => {
    renderCard(createMockOfferPreview({ isPremium: true }));
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render Premium when not premium', () => {
    renderCard(createMockOfferPreview({ isPremium: false }));
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should apply active class to bookmark when favorite', () => {
    renderCard(createMockOfferPreview({ isFavorite: true }));
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should link to /offer/:id', () => {
    const { offer } = renderCard();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', `/offer/${offer.id}`);
  });

  it('should redirect to /login when clicking bookmark and not authenticated', async () => {
    const user = userEvent.setup();
    renderCard(createMockOfferPreview({ isFavorite: false }), {
      authStatus: AuthorizationStatus.NoAuth,
    });

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
