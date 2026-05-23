import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import TransactionPage from '../../pages/TransactionPage';

describe('TransactionPage', () => {
  const renderTransactionPage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
        <TransactionPage />
      </MemoryRouter>
      </Provider>
    );
  };

  test('renders "Semua Transaksi" heading', () => {
    renderTransactionPage();
    expect(screen.getByText('Semua Transaksi')).toBeInTheDocument();
  });

  test('renders transaction items', async () => {
    renderTransactionPage();
    // Check for top-up transaction
    expect(await screen.findByText('Top Up Saldo')).toBeInTheDocument();
  });

  test('renders transaction history heading', () => {
    renderTransactionPage();
    expect(screen.getByText('Semua Transaksi')).toBeInTheDocument();
  });
});
