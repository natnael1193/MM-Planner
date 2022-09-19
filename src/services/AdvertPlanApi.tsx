import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdvertPlan } from '../interfaces/AdvertPlan.interface';
// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const advertPlanApi = createApi({
  reducerPath: 'advertPlanApi',
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
  tagTypes: ['AdvertPlan'],
  endpoints: (builder) => ({
    advertPlans: builder.query<AdvertPlan[], void>({
      query: () => '/advertPlan',
      providesTags: ['AdvertPlan'],
    }),
    advertPlan: builder.query<AdvertPlan, string>({
      query: (id) => `/advertPlan/${id}`,
      providesTags: ['AdvertPlan'],
    }),
    addAdvertPlan: builder.mutation<void, AdvertPlan>({
      query: (advert) => ({
        url: '/advertPlan',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ['AdvertPlan'],
    }),
    updateAdvertPlan: builder.mutation<void, AdvertPlan>({
      query: ({ ...rest }) => ({
          url: `/advertPlan/${rest.id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ['AdvertPlan'],
  }),
  deleteAdvertPlan: builder.mutation<void, string>({
      query: (id) => ({
          url: `/advertPlan/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['AdvertPlan']
  })
  }),
});

export const { useAdvertPlansQuery, useAdvertPlanQuery, useAddAdvertPlanMutation, useUpdateAdvertPlanMutation, useDeleteAdvertPlanMutation } = advertPlanApi;
