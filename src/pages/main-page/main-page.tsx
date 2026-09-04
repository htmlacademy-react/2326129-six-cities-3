import { Helmet } from 'react-helmet-async';
import { CityCard } from '../../components/city-card/city-card';
import { LocationItems } from './components/location-items/location-items';
import { SortingForm } from './components/sorting-form/sorting-form';

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type MainScreenProps = {
  offersCount: number;
}

function CityCardsList(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {Array.from({ length: 5 }, (_, index) => (
        <CityCard key={index} />
      ))}
    </div>
  );
}

function MainScreen({ offersCount }: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationItems cities={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              < SortingForm />
              < CityCardsList />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainScreen};
