import { CityName } from '../pages/main-page/const/const';
import { OfferPreview } from '../pages/offer-page/types/types';
import { loadOffers, setCity } from './action';
import { createReducer } from '@reduxjs/toolkit';

type OffersState = {
  city: CityName;
  offers: OfferPreview[];
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
