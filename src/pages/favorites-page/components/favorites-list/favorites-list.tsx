import { Link } from 'react-router-dom';
import { Offer } from '../../../offer-page/types/types';
import { FavoriteCard } from '../favorite-card/favorite-card';

type FavoritesLocationListProps = {
  city: string;
  offers: Offer[];
};

function FavoritesLocationList({ city, offers }: FavoritesLocationListProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export { FavoritesLocationList };
