import { Helmet } from 'react-helmet-async';
import { OfferGallery } from './components/offer-gallery/offer-gallery';
import { OfferItems } from './components/offer-items/offer-items';
import { useParams } from 'react-router-dom';
import { getAuthorizationStatus } from '../../authorization-status';
import { AuthorizationStatus } from '../../const';
import { ApartmentType, OfferPreview } from './types/types';
import { PageNotFound } from '../page-not-found/page-not-found';
import { ReviewForm } from './components/review-form/review-form';
import { getFullOffer } from '../../mocks';
import { Map } from '../../components/map';
import { PlaceCard } from '../../components/place-card/place-card';
import { getNearOffers } from './utils/utils';
import { ReviewList } from './components/review-list/review-list';

type OfferPageProps = {
  offers: OfferPreview[];
}

function capitalizeFirstLetterType(str: ApartmentType): string {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const authorizationStatus = getAuthorizationStatus();
  const currentOffer = id ? getFullOffer(id) : undefined;

  const foundOffer = offers.find((item) => item.id === id);

  if(!foundOffer || !currentOffer) {
    return <PageNotFound type='offer'/>;
  }

  const nearOffers = getNearOffers(offers, foundOffer);
  const offersForMap = [foundOffer, ...nearOffers];

  const {
    images,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    host,
    description,
    price,
    isFavorite,
    reviews = []
  } = currentOffer;

  const bedroomsAmount = `${bedrooms} ${bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`;
  const adultsAmount = `Max ${maxAdults} ${maxAdults === 1 ? 'adult' : 'adults'}`;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={`offer__bookmark-button ${isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetterType(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsAmount}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {adultsAmount}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {<OfferItems />}
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                {reviews && reviews.length > 0 && <ReviewList reviews={reviews} />}
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm />
                )}
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            offers={offersForMap}
            city={foundOffer.city}
            activeOfferId={currentOffer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((offer) : JSX.Element => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  variant='nearby'
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
