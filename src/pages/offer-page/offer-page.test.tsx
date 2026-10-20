import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { OfferPage } from './offer-page';
import { createMockApi, createTestStore } from '../../utils/mock-store';
import { createMockOffer, createMockOfferPreview, createMockReview } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

vi.mock('../../components/map', () => ({
  Map: () => <div data-testid="mock-map" />,
}));

type RenderOptions = {
  authStatus?: AuthorizationStatus;
  currentOffer?: ReturnType<typeof createMockOffer> | null;
  isOfferLoading?: boolean;
  nearbyOffers?: ReturnType<typeof createMockOfferPreview>[];
  comments?: ReturnType<typeof createMockReview>[];
  routeId?: string;
};

const renderOfferPage = ({
  authStatus = AuthorizationStatus.NoAuth,
  currentOffer = createMockOffer(),
  isOfferLoading = false,
  nearbyOffers = [],
  comments = [],
  routeId = 'offer-123',
}: RenderOptions = {}) => {
  const api = createMockApi();

  vi.mocked(api.get).mockImplementation((url: string) => {
    if (url.includes('/nearby')) {
      return Promise.resolve({ data: nearbyOffers });
    }
    if (url.includes('/comments')) {
      return Promise.resolve({ data: comments });
    }
    if (currentOffer) {
      return Promise.resolve({ data: currentOffer });
    }
    return Promise.reject(new Error('404'));
  });

  const store = createTestStore(
    {
      user: { user: null, authorizationStatus: authStatus },
      offers: {
        offers: [],
        currentOffer,
        nearbyOffers,
        comments,
        favoriteOffers: [],
        isOffersDataLoading: false,
        isOfferLoading,
        isCommentLoading: false,
      },
    },
    api,
  );

  return render(
    <Provider store={store}>
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/offer/${routeId}`]}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    </Provider>,
  );
};

describe('OfferPage', () => {
  it('should render LoadingScreen when isOfferLoading', () => {
    renderOfferPage({ isOfferLoading: true, currentOffer: null });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render PageNotFound when currentOffer is null', async () => {
    renderOfferPage({ currentOffer: null, isOfferLoading: false });
    expect(await screen.findByText(/offer not found/i)).toBeInTheDocument();
  });

  it('should render offer details', async () => {
    const offer = createMockOffer();
    renderOfferPage({ currentOffer: offer });

    expect(await screen.findByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByText(/what's inside/i)).toBeInTheDocument();
  });

  it('should render Premium mark if isPremium', async () => {
    renderOfferPage({ currentOffer: createMockOffer({ isPremium: true }) });
    expect(await screen.findByText('Premium')).toBeInTheDocument();
  });

  it('should render nearby cards', async () => {
    const nearby = [createMockOfferPreview(), createMockOfferPreview()];
    renderOfferPage({ nearbyOffers: nearby });

    await screen.findByTestId('mock-map');

    nearby.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render reviews count and list', async () => {
    const comments = [createMockReview(), createMockReview()];
    renderOfferPage({ comments });

    expect(await screen.findByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    comments.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
    });
  });

  it('should NOT render ReviewForm for unauthenticated user', async () => {
    renderOfferPage({ authStatus: AuthorizationStatus.NoAuth });
    await screen.findByText(/what's inside/i);
    expect(screen.queryByText(/your review/i)).not.toBeInTheDocument();
  });

  it('should render ReviewForm for authenticated user', async () => {
    renderOfferPage({ authStatus: AuthorizationStatus.Auth });
    expect(await screen.findByText(/your review/i)).toBeInTheDocument();
  });

  it('should redirect to /login when clicking bookmark and not authenticated', async () => {
    const user = userEvent.setup();
    renderOfferPage({ authStatus: AuthorizationStatus.NoAuth });

    await screen.findByText(/what's inside/i);

    await user.click(screen.getByRole('button', { name: /to bookmarks/i }));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
