import { render } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';

describe('OfferGallery', () => {
  it('should render all images', () => {
    const images = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];
    const { container } = render(<OfferGallery images={images} />);
    expect(container.querySelectorAll('.offer__image')).toHaveLength(3);
  });

  it('should render nothing when empty', () => {
    const { container } = render(<OfferGallery images={[]} />);
    expect(container.querySelectorAll('.offer__image')).toHaveLength(0);
  });
});
