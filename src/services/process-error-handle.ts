import { store } from '../store';
import { clearErrorAction } from '../store/api-actions';
import { errorNotification } from '../store/slices/app-slice';

export const processErrorHandle = (message: string): void => {
  store.dispatch(errorNotification(message));
  store.dispatch(clearErrorAction());
};
