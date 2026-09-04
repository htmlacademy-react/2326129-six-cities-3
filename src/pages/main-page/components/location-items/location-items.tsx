import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type Locations = {
  cities: string[];
};

function LocationItems({ cities }: Locations): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link to={AppRoute.Root} className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item--active' : ''}`}>
            <span>{city}</span>
          </Link>{' '}
        </li>
      ))}
    </ul>
  );
}

export { LocationItems };
