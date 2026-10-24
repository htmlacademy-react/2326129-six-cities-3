import { appReducer, citySelection, sortingSelection, errorNotification } from './app-slice';

describe('appSlice', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, { type: '' })).toEqual({
      city: 'Paris',
      sorting: 'popular',
      error: null,
    });
  });

  it('should update city and reset sorting on citySelection', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'price-high' as const,
      error: null,
    };
    const result = appReducer(state, citySelection('Amsterdam'));
    expect(result.city).toBe('Amsterdam');
    expect(result.sorting).toBe('popular');
  });

  it('should update sorting on sortingSelection', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'popular' as const,
      error: null,
    };
    const result = appReducer(state, sortingSelection('top-rated'));
    expect(result.sorting).toBe('top-rated');
    expect(result.city).toBe('Paris');
  });

  it('should set error on errorNotification', () => {
    expect(appReducer(undefined, errorNotification('Something wrong')).error).toBe('Something wrong');
  });

  it('should clear error on errorNotification(null)', () => {
    const state = {
      city: 'Paris' as const,
      sorting: 'popular' as const,
      error: 'oops',
    };
    expect(appReducer(state, errorNotification(null)).error).toBeNull();
  });
});
