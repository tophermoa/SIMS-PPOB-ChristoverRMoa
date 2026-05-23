import transactionReducer, {
  setHistory,
  appendHistory,
  setOffset,
  setHasMore,
  setLoading,
  setError,
  resetHistory,
} from '../../store/slices/transactionSlice';

describe('transactionSlice', () => {
  const initialState = {
    history: [],
    offset: 0,
    limit: 5,
    hasMore: true,
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(transactionReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setHistory', () => {
    const transactions = [{ id: 1, amount: 10000 }];
    const actual = transactionReducer(initialState, setHistory(transactions));
    expect(actual.history).toEqual(transactions);
  });

  test('should handle appendHistory', () => {
    const state = { ...initialState, history: [{ id: 1 }] };
    const actual = transactionReducer(state, appendHistory([{ id: 2 }]));
    expect(actual.history).toHaveLength(2);
  });

  test('should handle setOffset', () => {
    const actual = transactionReducer(initialState, setOffset(5));
    expect(actual.offset).toBe(5);
  });

  test('should handle setHasMore', () => {
    const actual = transactionReducer(initialState, setHasMore(false));
    expect(actual.hasMore).toBe(false);
  });

  test('should handle resetHistory', () => {
    const state = { ...initialState, history: [{ id: 1 }], offset: 10, hasMore: false };
    const actual = transactionReducer(state, resetHistory());
    expect(actual.history).toEqual([]);
    expect(actual.offset).toBe(0);
    expect(actual.hasMore).toBe(true);
  });
});
