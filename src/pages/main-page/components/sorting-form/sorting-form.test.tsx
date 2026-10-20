import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingForm } from './sorting-form';
import { vi } from 'vitest';

describe('SortingForm', () => {
  it('should render current sorting label', () => {
    render(<SortingForm sortingOption="popular" onSortChange={vi.fn()} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('should not show options initially', () => {
    render(<SortingForm sortingOption="popular" onSortChange={vi.fn()} />);
    expect(screen.queryByText('Price: low to high')).not.toBeInTheDocument();
  });

  it('should open and select option', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(<SortingForm sortingOption="popular" onSortChange={onSortChange} />);

    await user.click(screen.getByText('Popular'));
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();

    await user.click(screen.getByText('Price: low to high'));
    expect(onSortChange).toHaveBeenCalledWith('price-low');
  });
});
