import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('LoadingScreen', () => {
  it('should render loading text', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
