import { Link } from 'react-router-dom';
import { OfferPreview } from '../../../offer-page/types/types';
import { PlaceCard } from '../../../../components/place-card/place-card';

type FavoritesLocationListProps = {
  city: string;
  offers: OfferPreview[];
};

function FavoritesList({ city, offers }: FavoritesLocationListProps) {
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
        {offers && offers.length > 0 && offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} variant='favorites'/>
        ))}
      </div>
    </li>
  );
}

export { FavoritesList };
