import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PageNotFound } from './page-not-found';

const renderPage = (type: 'page' | 'offer') =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <PageNotFound type={type} />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe('PageNotFound', () => {
  it('should render page-not-found', () => {
    renderPage('page');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404');
    expect(heading).toHaveTextContent('Page Not Found');
  });

  it('should render offer-not-found', () => {
    renderPage('offer');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Offer not found');
  });

  it('should render link to root', () => {
    renderPage('page');
    expect(screen.getByRole('link', { name: /go to main page/i })).toHaveAttribute('href', '/');
  });

  it('should have link to root', () => {
    renderPage('page');
    const link = screen.getByRole('link', { name: /go to main page/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
