import { configureStore } from '@reduxjs/toolkit';
import proteinReducer from './slices/proteinSlice';
//TODO: Provide the store in the proper place
//TODO: Add notification slice
export const proteinStore = configureStore({
  reducer: {
    protein: proteinReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof proteinStore.getState>;
export type AppDispatch = typeof proteinStore.dispatch;
