import { render, screen } from '@testing-library/react';
import { ReviewList } from './review-list';
import { createMockReview } from '../../../../utils/mocks';

describe('ReviewList', () => {
  it('should render all reviews', () => {
    const reviews = [createMockReview(), createMockReview()];
    render(<ReviewList reviews={reviews} />);

    reviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
    });
  });

  it('should render empty list', () => {
    const { container } = render(<ReviewList reviews={[]} />);
    expect(container.querySelector('.reviews__list')).toBeEmptyDOMElement();
  });
});
