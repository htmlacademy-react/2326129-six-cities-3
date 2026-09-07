import { Link } from 'react-router-dom';
import { Offer } from '../../pages/offer-page/types/types';

type OfferCardProps = {
  offer: Offer;
  handleHover: (offer?: Offer) => void;
}

function OfferCard({ offer, handleHover }: OfferCardProps): JSX.Element {
  const { id, price, rating, title, type, images, isFavorite } = offer;
  const starRating = rating / 5 * 100;

  const handleHoverOn = () => {
    handleHover(offer);
  };

  const handleHoverOff = () => {
    handleHover();
  };
  return (
    <Link to={`/offer/${id}`}>
      <article className="cities__card place-card" onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={images[0]} width={260} height={200} alt={title} />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${starRating}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" />
          <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </div>
      </article>
    </Link>
  );
}

export { OfferCard };
