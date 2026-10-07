import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { rating } from '../../../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/store';
import { postCommentAction } from '../../../../store/api-actions';

const TEXT_MIN_LENGTH = 50;
const TEXT_MAX_LENGTH = 300;

function ReviewForm(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!id) {
      return;
    }

    setIsSubmitting(true);
    dispatch(postCommentAction({
      offerId: id,
      comment: form.comment,
      rating: form.rating,
    }))
      .unwrap()
      .then(() => setForm({ rating: 0, comment: '' }))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  };

  const isDisabled =
    form.comment.length < TEXT_MIN_LENGTH ||
    form.comment.length > TEXT_MAX_LENGTH ||
    form.rating === 0 ||
    isSubmitting;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={form.rating === value}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        value={form.comment}
        maxLength={TEXT_MAX_LENGTH}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{TEXT_MIN_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export { ReviewForm };
