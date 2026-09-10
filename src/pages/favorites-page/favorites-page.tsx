import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../offer-page/types/types';
import { FavoritesList } from './components/favorites-list/favorites-list';

type FavoritesPageProps = {
  offers: OfferPreview[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const groupedByCity: Record<string, OfferPreview[]> = {};

  favoriteOffers.forEach((offer) => {
    const cityName = offer.city.name;
    if (!groupedByCity[cityName]) {
      groupedByCity[cityName] = [];
    }
    groupedByCity[cityName].push(offer);
  });

  const cityGroups = Object.entries(groupedByCity);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {!cityGroups || cityGroups.length === 0 ? (
              <div className="favorites__status-wrapper">
                <p className="favorites__status">Nothing yet saved.</p>
              </div>
            ) : (
              <ul className="favorites__list">
                {cityGroups && cityGroups.length > 0 && cityGroups.map(([city, cityOffers]) => (
                  <FavoritesList key={city} city={city} offers={cityOffers} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export { FavoritesPage };
