import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesList } from './favorites-list';
import { createTestStore } from '../../../../utils/mock-store';
import { createMockOfferPreview } from '../../../../utils/mocks';

const renderList = (city = 'Paris', offers = [createMockOfferPreview()]) =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <FavoritesList city={city} offers={offers} />
      </MemoryRouter>
    </Provider>,
  );

describe('FavoritesList', () => {
  it('should render city name', () => {
    renderList('Amsterdam');
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should render a PlaceCard for each offer', () => {
    const offers = [
      createMockOfferPreview(),
      createMockOfferPreview(),
      createMockOfferPreview(),
    ];
    renderList('Paris', offers);

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render nothing in places list when offers are empty', () => {
    const { container } = renderList('Paris', []);
    expect(container.querySelector('.favorites__places')).toBeEmptyDOMElement();
  });

  it('should link city to main page', () => {
    renderList('Cologne');
    expect(screen.getByRole('link', { name: /cologne/i }))
      .toHaveAttribute('href', '/');
  });
});
