import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../offer-page/types/types';
import { FavoritesList } from './components/favorites-list/favorites-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useEffect } from 'react';
import { loadFavoriteOffersAction } from '../../store/api-actions';
import { EmptyFavoritesList } from './components/empty-favorites-list/empty-favorites-list';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);

  useEffect(() => {
    dispatch(loadFavoriteOffersAction());
  }, [dispatch]);

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
      {cityGroups.length === 0 ? (
        <EmptyFavoritesList/>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cityGroups && cityGroups.length > 0 && cityGroups.map(([city, cityOffers]) => (
                  <FavoritesList key={city} city={city} offers={cityOffers} />
                ))}
              </ul>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export { FavoritesPage };
