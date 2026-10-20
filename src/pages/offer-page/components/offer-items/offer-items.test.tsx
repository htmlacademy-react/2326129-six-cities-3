import { render, screen } from '@testing-library/react';
import { OfferItems } from './offer-items';

describe('OfferItems', () => {
  it('should render list of items', () => {
    const goods = ['Wi-Fi', 'Kitchen', 'Heating'];
    render(<OfferItems goods={goods} />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Heating')).toBeInTheDocument();
  });

  it('should render empty list when no goods', () => {
    const { container } = render(<OfferItems goods={[]} />);
    expect(container.querySelector('.offer__inside-list')).toBeEmptyDOMElement();
  });
});
