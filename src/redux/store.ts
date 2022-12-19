import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../services/LoginApi';
import { spotContentApi } from '../services/SpotContentApi';
import { spotApi } from '../services/SpotApi';
import { advertDetailApi } from '../services/AdvertDetailApi';
import { advertApi } from '../services/AdvertApi';
import { externalProgramApi } from '../services/ExternalProgramApi';
import { campaignApi } from '../services/CamapignApi';
import { advertPlanApi } from '../services/AdvertPlanApi';
import { paginationApi } from 'src/services/Test';
import { advertScheduleApi } from '../services/AdvertSchduleApi';
import { externalScheduleApi } from '../services/ExternalScheduleApi';
import { registerApi } from '../services/RegisterApi';
import { userApi } from '../services/UserApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [spotContentApi.reducerPath]: spotContentApi.reducer,
    [spotApi.reducerPath]: spotApi.reducer,
    [advertDetailApi.reducerPath]: advertDetailApi.reducer,
    [advertApi.reducerPath]: advertApi.reducer,
    [externalProgramApi.reducerPath]: externalProgramApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [advertPlanApi.reducerPath]: advertPlanApi.reducer,
    [advertScheduleApi.reducerPath]: advertScheduleApi.reducer,
    [externalScheduleApi.reducerPath]: externalScheduleApi.reducer,
    [paginationApi.reducerPath]: paginationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      loginApi.middleware,
      registerApi.middleware,
      spotContentApi.middleware,
      spotApi.middleware,
      advertDetailApi.middleware,
      advertApi.middleware,
      externalProgramApi.middleware,
      campaignApi.middleware,
      advertPlanApi.middleware,
      advertScheduleApi.middleware,
      externalScheduleApi.middleware,
      paginationApi.middleware
    ),
});
