import { Helmet } from 'react-helmet-async';
import { LocationItems } from './components/location-items/location-items';
import { Offer } from '../offer-page/types/types';
import { OffersSection } from '../offer-page/components/offers-section/offers-section';

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type MainPageProps = {
  offers: Offer[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
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
            <OffersSection offers={offers} />
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};
