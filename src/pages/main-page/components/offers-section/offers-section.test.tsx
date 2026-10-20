import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { OffersSection } from './offers-section';
import { createTestStore } from '../../../../utils/mock-store';
import { createMockOfferPreview } from '../../../../utils/mocks';

const renderSection = (offers = [createMockOfferPreview()]) =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <OffersSection
          offers={offers}
          onCardHover={vi.fn()}
          sortingOption="popular"
          onSortChange={vi.fn()}
        />
      </MemoryRouter>
    </Provider>,
  );

describe('OffersSection', () => {
  it('should show "1 place to stay" for a single offer', () => {
    renderSection([createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } })]);
    expect(screen.getByText(/1 place to stay in Paris/i)).toBeInTheDocument();
  });

  it('should show "N places to stay" for multiple offers', () => {
    const offers = [
      createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } }),
      createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } }),
      createMockOfferPreview({ city: { name: 'Paris', location: { latitude: 48, longitude: 2, zoom: 12 } } }),
    ];
    renderSection(offers);
    expect(screen.getByText(/3 places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render a PlaceCard for each offer', () => {
    const offers = [createMockOfferPreview(), createMockOfferPreview()];
    renderSection(offers);

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
