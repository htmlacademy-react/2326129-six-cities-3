import { CityName } from '../pages/main-page/const/const';
import { OfferPreview } from '../pages/offer-page/types/types';
import { offers } from '../mocks';
import { setActiveOfferId, setCity } from './action';
import { createReducer } from '@reduxjs/toolkit';

type OffersState = {
  city: CityName;
  offers: OfferPreview[];
  activeOfferId: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers,
  activeOfferId: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
      state.activeOfferId = null;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });
});

export { reducer };
