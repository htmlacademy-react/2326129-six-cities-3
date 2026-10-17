import { configureStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { vi } from 'vitest';
import { rootReducer } from '../store/root-reducer';
import { State } from '../types/state';

export const createMockApi = (): AxiosInstance =>
  ({
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    request: vi.fn(),
    head: vi.fn(),
    options: vi.fn(),
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    defaults: { headers: {} },
    getUri: vi.fn(),
  } as unknown as AxiosInstance);

export const createTestStore = (
  preloadedState?: Partial<State>,
  api: AxiosInstance = createMockApi(),
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: api },
      }),
  });
