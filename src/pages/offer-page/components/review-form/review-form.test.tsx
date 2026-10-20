import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ReviewForm } from './review-form';
import { createTestStore } from '../../../../utils/mock-store';

const renderForm = () => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/offer/offer-1']}>
        <Routes>
          <Route path="/offer/:id" element={<ReviewForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('ReviewForm', () => {
  it('should render form elements', () => {
    renderForm();
    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should keep submit disabled initially', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('should enable submit when rating and comment are valid', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByTitle('good'));
    await user.type(screen.getByRole('textbox'), 'a'.repeat(60));

    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
  });

  it('should keep submit disabled when comment too short', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByTitle('good'));
    await user.type(screen.getByRole('textbox'), 'short');

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});
