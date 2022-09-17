import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdvertPlan } from '../interfaces/AdvertPlan.interface';
const baseURL = `http://localhost:4000`;

export const advertPlanApi = createApi({
  reducerPath: 'advertPlanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
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
      query: ({ id, ...rest }) => ({
          url: `/advertPlan/${id}`,
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
