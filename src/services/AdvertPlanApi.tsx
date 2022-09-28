import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdvertPlan } from '../interfaces/AdvertPlan.interface';
// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

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
      query: () => '/AdvertPlan',
      providesTags: ['AdvertPlan'],
    }),
    advertPlan: builder.query<AdvertPlan, string>({
      query: (id) => `/AdvertPlan/${id}`,
      providesTags: ['AdvertPlan'],
    }),
    addAdvertPlan: builder.mutation<void, AdvertPlan>({
      query: (advert) => ({
        url: '/AdvertPlan',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ['AdvertPlan'],
    }),
    updateAdvertPlan: builder.mutation<void, AdvertPlan>({
      query: ({ ...rest }) => ({
          url: `/AdvertPlan/${rest.id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ['AdvertPlan'],
  }),
  deleteAdvertPlan: builder.mutation<void, string>({
      query: (id) => ({
          url: `/AdvertPlan/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['AdvertPlan']
  })
  }),
});

export const { useAdvertPlansQuery, useAdvertPlanQuery, useAddAdvertPlanMutation, useUpdateAdvertPlanMutation, useDeleteAdvertPlanMutation } = advertPlanApi;
