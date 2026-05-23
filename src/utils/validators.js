
export const validateEmail = (email) => {
  if (!email) return 'Email harus diisi';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Format email tidak valid';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password harus diisi';
  if (password.length < 8) return 'Password minimal 8 karakter';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Konfirmasi password harus diisi';
  if (password !== confirmPassword) return 'Password tidak sama';
  return '';
};

export const validateName = (name, fieldName = 'Nama') => {
  if (!name || !name.trim()) return `${fieldName} harus diisi`;
  return '';
};


