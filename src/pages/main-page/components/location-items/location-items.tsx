import { Link } from 'react-router-dom';

type Locations = {
  cities: string[];
};

function LocationItems({ cities }: Locations): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link to='/' title='/' className="locations__item-link tabs__item">
            <span>{city}</span>
          </Link>{' '}
        </li>
      ))}
    </ul>
  );
}

export { LocationItems };
