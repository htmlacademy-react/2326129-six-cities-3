import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingItems } from './sorting-items';
import { vi } from 'vitest';

describe('SortingItems', () => {
  it('should render all options', () => {
    render(<SortingItems activeSort="popular" onSelect={vi.fn()} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should apply active class', () => {
    render(<SortingItems activeSort="price-low" onSelect={vi.fn()} />);
    expect(screen.getByText('Price: low to high')).toHaveClass('places__option--active');
  });

  it('should call onSelect on option click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SortingItems activeSort="popular" onSelect={onSelect} />);
    await user.click(screen.getByText('Top rated first'));
    expect(onSelect).toHaveBeenCalledWith('top-rated');
  });
});
