import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { CityName } from '../../types/types';

type Locations = {
  cities: CityName[];
  activeCity: CityName;
  onCityChange: (city: CityName) => void;
};

function LocationItems({ cities, activeCity, onCityChange }: Locations): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link
            to={AppRoute.Root}
            className={`locations__item-link tabs__item ${
              city === activeCity
                ? 'tabs__item--active'
                : ''
            }`}
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { LocationItems };
