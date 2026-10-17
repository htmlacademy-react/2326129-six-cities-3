import { render, screen } from '@testing-library/react';
import { ReviewItem } from './review-item';
import { createMockReview } from '../../../../utils/mocks';

describe('ReviewItem', () => {
  it('should render review data', () => {
    const review = createMockReview();
    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByAltText(/reviews avatar/i)).toHaveAttribute(
      'src',
      review.user.avatarUrl,
    );
  });
});
