// src/components/place-card/place-card.tsx
import { Link } from 'react-router-dom';
import { OfferPreview } from '../../pages/offer-page/types/types';
import { AppRoute } from '../../const';

type PlaceCardVariant = 'cities' | 'favorites' | 'nearby';

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

  const isFavorites = variant === 'favorites';
  const isNearby = variant === 'nearby';

  const imageWidth = isFavorites ? 150 : 260;
  const imageHeight = isFavorites ? 110 : 200;

  let articleClass = 'cities__card place-card';
  let imageWrapperClass = 'cities__image-wrapper place-card__image-wrapper';
  let infoClass = 'place-card__info';

  if (isFavorites) {
    articleClass = 'favorites__card place-card';
    imageWrapperClass = 'favorites__image-wrapper place-card__image-wrapper';
    infoClass = 'favorites__card-info place-card__info';
  } else if (isNearby) {
    articleClass = 'near-places__card place-card';
    imageWrapperClass = 'near-places__image-wrapper place-card__image-wrapper';
  }

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
        <Link to={AppRoute.Offer.replace(':id', id)}>
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
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>

        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
}

export { PlaceCard };
