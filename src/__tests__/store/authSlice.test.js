import authReducer, { setToken, logout, setLoading, setError, clearError } from '../../store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setToken', () => {
    const actual = authReducer(initialState, setToken('test-token'));
    expect(actual.token).toBe('test-token');
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.error).toBeNull();
  });

  test('should handle logout', () => {
    const loggedInState = { ...initialState, token: 'test-token', isAuthenticated: true };
    const actual = authReducer(loggedInState, logout());
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });

  test('should handle setLoading', () => {
    const actual = authReducer(initialState, setLoading(true));
    expect(actual.loading).toBe(true);
  });

  test('should handle setError', () => {
    const actual = authReducer(initialState, setError('Login failed'));
    expect(actual.error).toBe('Login failed');
    expect(actual.loading).toBe(false);
  });

  test('should handle clearError', () => {
    const errorState = { ...initialState, error: 'Some error' };
    const actual = authReducer(errorState, clearError());
    expect(actual.error).toBeNull();
  });
});
