import { Link } from 'react-router-dom';
import { OfferPreview } from '../../../offer-page/types/types';
import { PlaceCard } from '../../../../components/place-card/place-card';
import { CityName } from '../../../main-page/const/const';
import { setCity } from '../../../../store/slices/app-slice';
import { AppRoute } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/store';

type FavoritesLocationListProps = {
  city: string;
  offers: OfferPreview[];
};

function FavoritesList({ city, offers }: FavoritesLocationListProps) {
  const dispatch = useAppDispatch();

  const handleCityClick = () => {
    dispatch(setCity(city as CityName));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.Root}
            onClick={handleCityClick}
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} variant='favorites'/>
        ))}
      </div>
    </li>
  );
}

export { FavoritesList };
