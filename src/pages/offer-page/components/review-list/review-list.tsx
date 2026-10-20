import { memo, useMemo } from 'react';
import { Review } from '../../types/types';
import { ReviewItem } from '../review-item/review-item';

const MAX_REVIEWS = 10;

type ReviewListProps = {
  reviews: Review[];
};

function ReviewListComponent({ reviews }: ReviewListProps): JSX.Element {
  const visibleReviews = useMemo(
    () => [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS),
    [reviews]
  );

  return (
    <ul className="reviews__list">
      {visibleReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export const ReviewList = memo(ReviewListComponent);
