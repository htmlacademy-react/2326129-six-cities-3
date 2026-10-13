import { memo } from 'react';
import { Review } from '../../types/types';
import { ReviewItem } from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewListComponent({ reviews }: ReviewListProps): JSX.Element {
  return(
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export const ReviewList = memo(ReviewListComponent);
