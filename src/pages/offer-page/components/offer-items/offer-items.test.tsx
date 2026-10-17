import { render, screen } from '@testing-library/react';
import { OfferItems } from './offer-items';

describe('OfferItems', () => {
  it('should render list of items', () => {
    render(<OfferItems />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
  });
});
