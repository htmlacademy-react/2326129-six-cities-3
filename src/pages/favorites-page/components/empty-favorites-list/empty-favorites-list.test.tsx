import { render, screen } from '@testing-library/react';
import { EmptyFavoritesList } from './empty-favorites-list';

describe('EmptyFavoritesList', () => {
  it('should render empty text', () => {
    render(<EmptyFavoritesList />);
    expect(screen.getByText(/nothing yet saved/i)).toBeInTheDocument();
  });
});
