import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingOption } from '../../const';
import { CityName } from '../../pages/main-page/const/const';

type AppState = {
  city: CityName;
  sorting: SortingOption;
  error: string | null;
};

const initialState: AppState = {
  city: 'Paris',
  sorting: 'popular',
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    citySelection: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
      state.sorting = 'popular';
    },
    sortingSelection: (state, action: PayloadAction<SortingOption>) => {
      state.sorting = action.payload;
    },
    errorNotification: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { citySelection, sortingSelection, errorNotification } = appSlice.actions;
export const appReducer = appSlice.reducer;
