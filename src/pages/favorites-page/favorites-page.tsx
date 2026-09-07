import { Helmet } from 'react-helmet-async';
import { Offer } from '../offer-page/types/types';
import { FavoritesLocationList } from './components/favorites-list/favorites-list';

type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const groupedByCity = favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const city = offer.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

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
            {cityGroups.length === 0 ? (
              <div className="favorites__status-wrapper">
                <p className="favorites__status">Nothing yet saved.</p>
              </div>
            ) : (
              <ul className="favorites__list">
                {cityGroups.map(([city, cityOffers]) => (
                  <FavoritesLocationList key={city} city={city} offers={cityOffers} />
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
