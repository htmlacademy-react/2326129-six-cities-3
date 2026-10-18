import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { EmptyOffersList } from './empty-offers-list';
import { createTestStore } from '../../../../utils/mock-store';

describe('EmptyOffersList', () => {
  it('should render current city', () => {
    const store = createTestStore({
      app: { city: 'Amsterdam', sorting: 'popular', error: null },
    });
    render(
      <Provider store={store}>
        <EmptyOffersList />
      </Provider>,
    );

    expect(screen.getByText(/no places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/)).toBeInTheDocument();
  });
});
