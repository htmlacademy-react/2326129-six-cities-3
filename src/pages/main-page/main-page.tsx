import { Helmet } from 'react-helmet-async';
import { LocationItems } from './components/location-items/location-items';
import { OffersSection } from '../offer-page/components/offers-section/offers-section';
import { Map } from '../../components/map/map';
import { CITIES } from './const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setActiveOfferId, setCity } from '../../store/action';
import { City } from '../offer-page/types/types';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);

  const currentOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const currentCity: City = currentOffers && currentOffers.length > 0
    ? currentOffers[0].city
    : {
      name: selectedCity,
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
            <LocationItems
              cities={CITIES}
              activeCity={selectedCity}
              onCityChange={(city) => dispatch(setCity(city))}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersSection
              offers={currentOffers}
              onCardHover={(offer) => dispatch(setActiveOfferId(offer ? offer.id : null))}
            />
            <div className="cities__right-section">
              <Map className='cities__map' city={currentCity} offers={currentOffers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};
