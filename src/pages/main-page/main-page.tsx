import { Helmet } from 'react-helmet-async';
import { LocationItems } from './components/location-items/location-items';
import { OfferPreview } from '../offer-page/types/types';
import { OffersSection } from '../offer-page/components/offers-section/offers-section';
import { Map } from '../../components/map/map';
import { useState } from 'react';
import { CityName } from './types/types';

const CITIES: CityName[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type MainPageProps = {
  offers: OfferPreview[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<CityName>('Paris');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityOffers = offers.filter((offer) => offer.city.name === activeCity);
  const currentCity = cityOffers && cityOffers.length > 0
    ? cityOffers[0].city
    : {
      name: activeCity,
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
    };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationItems cities={CITIES} activeCity={activeCity} onCityChange={setActiveCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersSection offers={cityOffers} onCardHover={(offer) => setActiveOfferId(offer ? offer.id : null)} />
            <div className="cities__right-section">
              <Map city={currentCity} offers={cityOffers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};
