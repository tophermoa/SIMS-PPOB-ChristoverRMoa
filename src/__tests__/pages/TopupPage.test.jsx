import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import TopupPage from '../../pages/TopupPage';

describe('TopupPage', () => {
  const renderTopupPage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
        <TopupPage />
      </MemoryRouter>
      </Provider>
    );
  };

  test('renders "Nominal Top Up" heading', () => {
    renderTopupPage();
    expect(screen.getByText('Nominal Top Up')).toBeInTheDocument();
  });

  test('renders amount input', () => {
    renderTopupPage();
    expect(
      screen.getByPlaceholderText('masukan nominal Top Up')
    ).toBeInTheDocument();
  });

  test('renders all 6 preset amount buttons', () => {
    renderTopupPage();
    expect(screen.getByText('Rp10.000')).toBeInTheDocument();
    expect(screen.getByText('Rp20.000')).toBeInTheDocument();
    expect(screen.getByText('Rp50.000')).toBeInTheDocument();
    expect(screen.getByText('Rp100.000')).toBeInTheDocument();
    expect(screen.getByText('Rp250.000')).toBeInTheDocument();
    expect(screen.getByText('Rp500.000')).toBeInTheDocument();
  });

  test('renders disabled Top Up button initially', () => {
    renderTopupPage();
    const submitBtn = screen.getByRole('button', { name: 'Top Up' });
    expect(submitBtn).toBeDisabled();
  });

  test('enables Top Up button when amount is entered', () => {
    renderTopupPage();
    const amountInput = screen.getByPlaceholderText('masukan nominal Top Up');
    fireEvent.change(amountInput, { target: { value: '10000', name: 'amount' } });
    const submitBtn = screen.getByRole('button', { name: 'Top Up' });
    expect(submitBtn).not.toBeDisabled();
  });

  test('sets input value when preset button is clicked', () => {
    renderTopupPage();
    const presetBtn = screen.getByText('Rp50.000');
    fireEvent.click(presetBtn);
    const amountInput = screen.getByPlaceholderText('masukan nominal Top Up');
    expect(amountInput.value).toBe('50000');
  });
});
