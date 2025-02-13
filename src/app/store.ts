import { configureStore } from '@reduxjs/toolkit';
import repoReducer from '../features/repos/repoSlice';

export const store = configureStore({
  reducer: {
    repos: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;