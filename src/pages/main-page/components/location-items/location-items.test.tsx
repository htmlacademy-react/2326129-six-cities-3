import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { LocationItems } from './location-items';
import { CITIES } from '../../const/const';

const renderItems = (activeCity: typeof CITIES[number] = 'Paris', onCityChange = vi.fn()) =>
  render(
    <MemoryRouter>
      <LocationItems
        cities={CITIES}
        activeCity={activeCity}
        onCityChange={onCityChange}
      />
    </MemoryRouter>,
  );

describe('LocationItems', () => {
  it('should render all cities', () => {
    renderItems();
    CITIES.forEach((city) => {
      expect(screen.getByRole('link', { name: city })).toBeInTheDocument();
    });
  });

  it('should mark active city with active class', () => {
    renderItems('Amsterdam');
    expect(screen.getByRole('link', { name: 'Amsterdam' }))
      .toHaveClass('tabs__item--active');
  });

  it('should call onCityChange on click', async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();
    renderItems('Paris', onCityChange);

    await user.click(screen.getByRole('link', { name: 'Amsterdam' }));
    expect(onCityChange).toHaveBeenCalledWith('Amsterdam');
  });
});
