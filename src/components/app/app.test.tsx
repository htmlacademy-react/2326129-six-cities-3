import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import App from './app';
import { createMockApi, createTestStore } from '../../utils/mock-store';
import { AuthorizationStatus } from '../../const';
import { createMockOffer, createMockOfferPreview } from '../../utils/mocks';
import browserHistory from '../../browser-history';

type RenderOptions = {
  route: string;
  authStatus?: AuthorizationStatus;
  currentOffer?: ReturnType<typeof createMockOffer> | null;
};

const renderApp = ({
  route,
  authStatus = AuthorizationStatus.NoAuth,
  currentOffer = null,
}: RenderOptions) => {
  browserHistory.push(route);

  const api = createMockApi();
  vi.mocked(api.get).mockImplementation((url: string) => {
    if (currentOffer && url === `/offers/${currentOffer.id}`) {
      return Promise.resolve({ data: currentOffer } as never);
    }
    return Promise.resolve({ data: [] } as never);
  });
  vi.mocked(api.post).mockResolvedValue({ data: {} } as never);
  vi.mocked(api.delete).mockResolvedValue({ data: undefined } as never);

  const store = createTestStore(
    {
      user: { user: null, authorizationStatus: authStatus },
      offers: {
        offers: [createMockOfferPreview()],
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        favoriteOffers: [],
        isOffersDataLoading: false,
        isOfferLoading: false,
        isCommentLoading: false,
      },
      app: { city: 'Paris', sorting: 'popular', error: null },
    },
    api,
  );

  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

it('should render OfferPage at "/offer/:id"', async () => {
  const offer = createMockOffer();
  renderApp({ route: `/offer/${offer.id}`, currentOffer: offer });
  expect(await screen.findByRole('heading', { name: offer.title })).toBeInTheDocument();
});

describe('App routing', () => {
  it('should render MainPage at "/"', async () => {
    renderApp({ route: '/' });
    expect(await screen.findByText(/places? to stay/i)).toBeInTheDocument();
  });

  it('should render LoginPage at "/login" for unauthenticated user', async () => {
    renderApp({ route: '/login' });
    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should redirect authenticated user from "/login" to "/"', async () => {
    renderApp({ route: '/login', authStatus: AuthorizationStatus.Auth });
    expect(await screen.findByText(/places? to stay/i)).toBeInTheDocument();
  });

  it('should redirect unauthenticated from "/favorites" to "/login"', async () => {
    renderApp({ route: '/favorites' });
    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should render FavoritesPage at "/favorites" when authorized', async () => {
    renderApp({ route: '/favorites', authStatus: AuthorizationStatus.Auth });
    expect(await screen.findByText(/nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render OfferPage at "/offer/:id"', async () => {
    const offer = createMockOffer();
    renderApp({ route: `/offer/${offer.id}`, currentOffer: offer });
    expect(await screen.findByRole('heading', { name: offer.title })).toBeInTheDocument();
  });

  it('should render PageNotFound for unknown route', async () => {
    renderApp({ route: '/unknown-route' });
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404');
  });
});
