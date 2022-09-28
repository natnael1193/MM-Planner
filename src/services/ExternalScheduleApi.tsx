import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExternalSchedule } from 'src/interfaces/ExternalSchedule.interface';

// const baseURL = `http://localhost:4000`;
const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const externalScheduleApi = createApi({
  reducerPath: 'externalSchedule',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = baseToken;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ExternalSchedule'],
  endpoints: (builder) => ({
    stations: builder.query<ExternalSchedule[], void>({
      query: () => '/Station',
      providesTags: ['ExternalSchedule'],
    }),
    programByStation: builder.query<ExternalSchedule, string>({
      query: (id) => `Station/${id}`,
      providesTags: ['ExternalSchedule'],
    }),
    scheduleByProgram: builder.query<ExternalSchedule, string>({
      query: (id) => `Program/${id}`,
      providesTags: ['ExternalSchedule'],
    }),
  }),
});

export const {
  useStationsQuery,
  useProgramByStationQuery,
  useScheduleByProgramQuery
} = externalScheduleApi;
