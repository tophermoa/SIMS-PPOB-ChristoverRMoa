import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import HomePage from '../../pages/HomePage';

describe('HomePage', () => {
  const renderHomePage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
        <HomePage />
      </MemoryRouter>
      </Provider>
    );
  };

  test('renders Service Grid', async () => {
    renderHomePage();
    expect(await screen.findByText('PBB')).toBeInTheDocument();
  });

  test('renders promo section', () => {
    renderHomePage();
    expect(screen.getByText('Temukan promo menarik')).toBeInTheDocument();
  });
});
