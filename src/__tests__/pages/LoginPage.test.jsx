import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import LoginPage from '../../pages/LoginPage';

describe('LoginPage', () => {
  const renderLoginPage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
      </Provider>
    );
  };

  test('renders SIMS PPOB logo', () => {
    renderLoginPage();
    expect(screen.getByText('SIMS PPOB')).toBeInTheDocument();
  });

  test('renders heading text', () => {
    renderLoginPage();
    expect(
      screen.getByText(/Masuk atau buat akun/i)
    ).toBeInTheDocument();
  });

  test('renders email input', () => {
    renderLoginPage();
    expect(
      screen.getByPlaceholderText('Masukan email anda')
    ).toBeInTheDocument();
  });

  test('renders password input', () => {
    renderLoginPage();
    expect(
      screen.getByPlaceholderText('Masukan password anda')
    ).toBeInTheDocument();
  });

  test('renders Masuk button', () => {
    renderLoginPage();
    expect(screen.getByText('Masuk')).toBeInTheDocument();
  });

  test('renders registration link', () => {
    renderLoginPage();
    expect(screen.getByText('di sini')).toBeInTheDocument();
  });

  test('shows email validation error on blur with empty value', () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText('Masukan email anda');
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    expect(screen.getByText('Email harus diisi')).toBeInTheDocument();
  });

  test('shows email validation error for invalid format', () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText('Masukan email anda');
    fireEvent.change(emailInput, { target: { value: 'invalid-email', name: 'email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText('Format email tidak valid')).toBeInTheDocument();
  });

  test('shows password validation error on blur with empty value', () => {
    renderLoginPage();
    const passwordInput = screen.getByPlaceholderText('Masukan password anda');
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);
    expect(screen.getByText('Password harus diisi')).toBeInTheDocument();
  });

  test('shows password validation error for short password', () => {
    renderLoginPage();
    const passwordInput = screen.getByPlaceholderText('Masukan password anda');
    fireEvent.change(passwordInput, { target: { value: '1234', name: 'password' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText('Password minimal 8 karakter')).toBeInTheDocument();
  });
});
