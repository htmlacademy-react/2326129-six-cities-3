type Locations = {
  cities: string[];
};

function LocationItems({ cities }: Locations): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className="locations__item-link tabs__item" href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export { LocationItems };
