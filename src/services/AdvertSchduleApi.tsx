import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VoidFunctionComponent } from 'react';
import { AdvertSchedule } from '../interfaces/AdvertSchedule.interface';

// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const advertScheduleApi = createApi({
  reducerPath: 'advertSchedule',
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
  tagTypes: ['AdvertSchedule'],
  endpoints: (builder) => ({
    advertSchedules: builder.query<AdvertSchedule[], void>({
      // query: () => 'Campaign',
      query: () => 'AdvertSchedule',
      providesTags: ['AdvertSchedule'],
    }),
    advertSchedule: builder.query<AdvertSchedule, string>({
      query: (id) => `AdvertSchedule/${id}`,
      providesTags: ['AdvertSchedule'],
    }),
    addAdvertSchedule: builder.mutation<void, AdvertSchedule>({
      query: (advertSchedule) => ({
        url: 'AdvertSchedule',
        method: 'POST',
        body: advertSchedule,
      }),
      invalidatesTags: ['AdvertSchedule'],
    }),
    updateAdvertSchedule: builder.mutation<void, AdvertSchedule>({
      query: ({ ...rest }) => ({
        url: `AdvertSchedule/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['AdvertSchedule'],
    }),

    deleteAdvertSchedule: builder.mutation<void, string>({
      query: (id) => ({
        url: `AdvertSchedule/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdvertSchedule'],
    }),
  }),
});

export const {
  useAdvertSchedulesQuery,
  useAdvertScheduleQuery,
  useAddAdvertScheduleMutation,
  useUpdateAdvertScheduleMutation,
  useDeleteAdvertScheduleMutation,
} = advertScheduleApi;
