import { Helmet } from 'react-helmet-async';
import { LocationItems } from './components/location-items/location-items';
import { OffersSection } from '../offer-page/components/offers-section/offers-section';
import { Map } from '../../components/map/map';
import { CITIES } from './const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCity } from '../../store/action';
import { City } from '../offer-page/types/types';
import { useState } from 'react';
import { SortingOption, CITY_LOCATIONS, AuthorizationStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);

  const [sortingOption, setSortingOption] = useState<SortingOption>('popular');

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);


  const currentOffers = offers
    .filter((offer) => offer.city.name === selectedCity)
    .sort((a, b) => {
      switch(sortingOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'top-rated':
          return b.rating - a.rating;
        case 'popular':
        default:
          return 0;
      }
    });

  const currentCity: City = currentOffers && currentOffers.length > 0
    ? currentOffers[0].city
    : {
      name: selectedCity,
      location: CITY_LOCATIONS[selectedCity]};

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

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
              sortingOption={sortingOption}
              onSortChange={setSortingOption}
              offers={currentOffers}
              onCardHover={(offer) => setActiveOfferId(offer ? offer.id : null)}
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
