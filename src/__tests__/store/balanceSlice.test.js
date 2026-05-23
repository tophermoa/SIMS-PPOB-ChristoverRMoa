import balanceReducer, { setBalance, setLoading, setError } from '../../store/slices/balanceSlice';

describe('balanceSlice', () => {
  const initialState = {
    balance: 0,
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(balanceReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setBalance', () => {
    const actual = balanceReducer(initialState, setBalance(100000));
    expect(actual.balance).toBe(100000);
    expect(actual.error).toBeNull();
  });

  test('should handle setLoading', () => {
    const actual = balanceReducer(initialState, setLoading(true));
    expect(actual.loading).toBe(true);
  });

  test('should handle setError', () => {
    const actual = balanceReducer(initialState, setError('Failed to fetch balance'));
    expect(actual.error).toBe('Failed to fetch balance');
    expect(actual.loading).toBe(false);
  });
});
