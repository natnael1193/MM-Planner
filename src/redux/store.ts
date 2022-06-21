import { spotContentApi } from '../services/SpotContentApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [spotContentApi.reducerPath]: spotContentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotContentApi.middleware),
});
