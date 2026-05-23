import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BalanceCard from './index';
import useActions from './hooks/useActions';

// Mock the useActions hook without auto-mocking to avoid parsing import.meta
jest.mock('./hooks/useActions', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('BalanceCard Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('renders loading skeleton when loading is true', () => {
    useActions.mockReturnValue({
      balanceState: 0,
      loading: true,
    });

    render(<BalanceCard />);
    
    // Label "Saldo anda" shouldn't be visible while loading
    expect(screen.queryByText('Saldo anda')).not.toBeInTheDocument();
    
    // Toggle button shouldn't be visible while loading
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders masked balance initially', () => {
    useActions.mockReturnValue({
      balanceState: 150000,
      loading: false,
    });

    render(<BalanceCard />);
    
    // Should show the title
    expect(screen.getByText('Saldo anda')).toBeInTheDocument();
    
    // Should show masked balance
    expect(screen.getByText('●●●●●●●')).toBeInTheDocument();
    
    // Should NOT show formatted balance
    expect(screen.queryByText('150.000')).not.toBeInTheDocument();

    // Button should say "Lihat Saldo"
    expect(screen.getByRole('button')).toHaveTextContent(/Lihat Saldo/i);
  });

  test('toggles to show balance when button is clicked', () => {
    useActions.mockReturnValue({
      balanceState: 150000,
      loading: false,
    });

    render(<BalanceCard />);
    
    const toggleButton = screen.getByRole('button');
    
    // Click the button
    fireEvent.click(toggleButton);

    // Should show formatted balance
    expect(screen.getByText('150.000')).toBeInTheDocument();
    
    // Should NOT show masked balance
    expect(screen.queryByText('●●●●●●●')).not.toBeInTheDocument();

    // Button should now say "Tutup Saldo"
    expect(toggleButton).toHaveTextContent(/Tutup Saldo/i);
  });
});
