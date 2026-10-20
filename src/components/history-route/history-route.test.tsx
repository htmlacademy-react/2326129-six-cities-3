import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';

it('should sync with history changes', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { rerender } = render(
    <HistoryRouter history={history}>
      <div>Test content</div>
    </HistoryRouter>,
  );

  act(() => {
    history.push('/new');
  });

  rerender(
    <HistoryRouter history={history}>
      <div>Test content</div>
    </HistoryRouter>,
  );

  expect(screen.getByText('Test content')).toBeInTheDocument();
});
