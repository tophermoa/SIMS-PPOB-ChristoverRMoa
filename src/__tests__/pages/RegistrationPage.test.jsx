import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import RegistrationPage from '../../pages/RegistrationPage';

describe('RegistrationPage', () => {
  const renderRegistrationPage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
      </Provider>
    );
  };

  test('renders heading text', () => {
    renderRegistrationPage();
    expect(
      screen.getByText(/Lengkapi data untuk/i)
    ).toBeInTheDocument();
  });

  test('renders all 5 input fields', () => {
    renderRegistrationPage();
    expect(screen.getByPlaceholderText('Masukan email anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nama depan')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nama belakang')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buat password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Konfirmasi password')).toBeInTheDocument();
  });

  test('renders Registrasi button', () => {
    renderRegistrationPage();
    expect(screen.getByText('Registrasi')).toBeInTheDocument();
  });

  test('renders login link', () => {
    renderRegistrationPage();
    expect(screen.getByText('di sini')).toBeInTheDocument();
  });

  test('shows first name validation error on blur', () => {
    renderRegistrationPage();
    const firstNameInput = screen.getByPlaceholderText('Nama depan');
    fireEvent.focus(firstNameInput);
    fireEvent.blur(firstNameInput);
    expect(screen.getByText('Nama depan harus diisi')).toBeInTheDocument();
  });

  test('shows password mismatch error', () => {
    renderRegistrationPage();
    const passwordInput = screen.getByPlaceholderText('Buat password');
    const confirmInput = screen.getByPlaceholderText('Konfirmasi password');

    fireEvent.change(passwordInput, { target: { value: 'password123', name: 'password' } });
    fireEvent.change(confirmInput, { target: { value: 'different', name: 'confirmPassword' } });
    fireEvent.blur(confirmInput);

    expect(screen.getByText('Password tidak sama')).toBeInTheDocument();
  });
});
