import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  const renderNavbar = () => {
    return render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  };

  test('renders SIMS PPOB logo text', () => {
    renderNavbar();
    expect(screen.getByText('SIMS PPOB')).toBeInTheDocument();
  });

  test('renders Top Up navigation link', () => {
    renderNavbar();
    expect(screen.getByText('Top Up')).toBeInTheDocument();
  });

  test('renders Transaction navigation link', () => {
    renderNavbar();
    expect(screen.getByText('Transaction')).toBeInTheDocument();
  });

  test('renders Akun navigation link', () => {
    renderNavbar();
    expect(screen.getByText('Akun')).toBeInTheDocument();
  });

  test('renders logo image', () => {
    renderNavbar();
    expect(screen.getByAltText('SIMS PPOB')).toBeInTheDocument();
  });
});
