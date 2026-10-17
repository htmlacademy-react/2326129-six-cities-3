import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ErrorMessage from './error-message';
import { createTestStore } from '../../utils/mock-store';

describe('ErrorMessage', () => {
  it('should render nothing when error is null', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render error text when error is set', () => {
    const store = createTestStore({
      app: { city: 'Paris', sorting: 'popular', error: 'Network error' },
    });
    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>,
    );
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });
});
