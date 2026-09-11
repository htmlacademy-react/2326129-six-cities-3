// src/components/place-card/place-card.tsx
import { Link } from 'react-router-dom';
import { OfferPreview } from '../../pages/offer-page/types/types';

type PlaceCardVariant = 'cities' | 'favorites';

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: PlaceCardVariant;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function PlaceCard({
  offer,
  variant = 'cities',
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps): JSX.Element {
  const { id, title, type, price, rating, previewImage, isFavorite, isPremium } = offer;
  const starRating = (rating / 5) * 100;
  const placeType = type.charAt(0).toUpperCase() + type.slice(1);

  const isCities = variant === 'cities';
  const imageWidth = isCities ? 260 : 150;
  const imageHeight = isCities ? 200 : 110;

  const articleClass = isCities
    ? 'cities__card place-card'
    : 'favorites__card place-card';

  const imageWrapperClass = isCities
    ? 'cities__image-wrapper place-card__image-wrapper'
    : 'favorites__image-wrapper place-card__image-wrapper';

  const infoClass = isCities
    ? 'place-card__info'
    : 'favorites__card-info place-card__info';

  return (
    <article
      className={articleClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageWrapperClass}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt={title}
          />
        </Link>
      </div>

      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${starRating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">
          {placeType}
        </p>
      </div>
    </article>
  );
}

export { PlaceCard };
