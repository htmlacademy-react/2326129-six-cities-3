import { appReducer, setCity, setSorting, setError } from './app-slice';

describe('appSlice', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, { type: '' })).toEqual({
      city: 'Paris',
      sorting: 'popular',
      error: null,
    });
  });

  it('should update city and reset sorting on setCity', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'price-high' as const,
      error: null,
    };
    const result = appReducer(state, setCity('Amsterdam'));
    expect(result.city).toBe('Amsterdam');
    expect(result.sorting).toBe('popular');
  });

  it('should update sorting on setSorting', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'popular' as const,
      error: null,
    };
    const result = appReducer(state, setSorting('top-rated'));
    expect(result.sorting).toBe('top-rated');
    expect(result.city).toBe('Paris');
  });

  it('should set error on setError', () => {
    expect(appReducer(undefined, setError('Something wrong')).error).toBe('Something wrong');
  });

  it('should clear error on setError(null)', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'popular' as const,
      error: 'oops',
    };
    expect(appReducer(state, setError(null)).error).toBeNull();
  });
});
