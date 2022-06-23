import { configureStore } from '@reduxjs/toolkit';
import { spotContentApi } from '../services/SpotContentApi';
import { spotApi } from '../services/SpotApi';
import { advertDetailApi } from '../services/AdvertDetailApi';
import { advertApi } from '../services/AdvertApi';

export const store = configureStore({
  reducer: {
    [spotContentApi.reducerPath]: spotContentApi.reducer,
    [spotApi.reducerPath]: spotApi.reducer,
    [advertDetailApi.reducerPath]: advertDetailApi.reducer,
    [advertApi.reducerPath]: advertApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      spotContentApi.middleware,
      spotApi.middleware,
      advertDetailApi.middleware,
      advertApi.middleware
    ),
});
