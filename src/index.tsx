import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffersAction, loadFavoriteOffersAction } from './store/api-actions';
import { AuthorizationStatus } from './const';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction())
  .unwrap()
  .finally(() => {
    if (store.getState().authorizationStatus === AuthorizationStatus.Auth) {
      store.dispatch(loadFavoriteOffersAction());
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App/>
    </Provider>
  </React.StrictMode>
);
