import { Helmet } from 'react-helmet-async';
import { LocationItems } from './components/location-items/location-items';
import { OffersSection } from './components/offers-section/offers-section';
import { Map } from '../../components/map/map';
import { CITIES, CityName } from './const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCity, setSorting } from '../../store/action';
import { City, OfferPreview } from '../offer-page/types/types';
import { useCallback, useMemo, useState } from 'react';
import { CITY_LOCATIONS, SortingOption } from '../../const';
import { EmptyOffersList } from './components/empty-offers-list/main-empty';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const sortingOption = useAppSelector((state) => state.sorting);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleCardHover = useCallback((offer?: OfferPreview) => {
    setActiveOfferId(offer ? offer.id : null);
  }, []);

  const handleSortChange = useCallback((option: SortingOption) => {
    dispatch(setSorting(option));
  }, [dispatch]);

  const handleCityChange = useCallback((city: CityName) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const currentOffers = useMemo(
    () => offers
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
      }),
    [offers, selectedCity, sortingOption]
  );

  const currentCity: City = currentOffers && currentOffers.length > 0
    ? currentOffers[0].city
    : {
      name: selectedCity,
      location: CITY_LOCATIONS[selectedCity]};

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
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          {offers && offers.length > 0 ? (
            <div className="cities__places-container container">
              <OffersSection
                sortingOption={sortingOption}
                onSortChange={handleSortChange}
                offers={currentOffers}
                onCardHover={handleCardHover}
              />
              <div className="cities__right-section">
                <Map className='cities__map' city={currentCity} offers={currentOffers} activeOfferId={activeOfferId}/>
              </div>
            </div>
          ) :
            <EmptyOffersList />}
        </div>
      </main>
    </div>
  );
}

export {MainPage};
