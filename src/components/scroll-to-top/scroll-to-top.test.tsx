import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import { vi } from 'vitest';
import ScrollToTop from './scroll-to-top';

describe('ScrollToTop', () => {
  it('should call window.scrollTo on mount', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollSpy).toHaveBeenCalledWith(0, 0);
    scrollSpy.mockRestore();
  });

  it('should call window.scrollTo again when pathname changes', async () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Link to="/other">Go to other</Link>} />
          <Route path="/other" element={<div>Other page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(scrollSpy).toHaveBeenCalledTimes(1);

    await user.click(screen.getByText('Go to other'));
    await screen.findByText('Other page');

    expect(scrollSpy).toHaveBeenCalledTimes(2);
    scrollSpy.mockRestore();
  });
});
