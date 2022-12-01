import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Advert, Adverts, AdvertAds, AdvertPrices } from '../interfaces/Advert.interface';

// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

// console.log(baseToken)

interface ListResponse<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: T[];
}

export const advertApi = createApi({
  reducerPath: 'advertApi',
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
  tagTypes: ['Advert', 'Campaign', 'AdvertAds', 'AdvertPrices'],
  endpoints: (builder) => ({
    adverts: builder.query<ListResponse<Advert>, number | void>({
      query: () => `/ModifiedAdvertPlan`,
      providesTags: ['Advert', 'Campaign'],
    }),
    advert: builder.query<Advert, string>({
      query: (id) => `/ModifiedAdvertPlan/${id}`,
      providesTags: ['Advert'],
    }),
    advertPrices: builder.query<Advert, string>({
      query: (id) => `/ModifiedAdvertPlan/${id}/adverts`,
      providesTags: ['Advert'],
    }),
    addAdvert: builder.mutation<void, Advert>({
      query: (advert) => ({
        url: '/Advert',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ['Advert'],
    }),
    addMultipleAdvert: builder.mutation<void, Adverts>({
      query: (advert) => ({
        url: '/ModifiedAdvertPlan/multiple',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ['Advert'],
    }),
    updateAdvert: builder.mutation<void, Advert>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Advert'],
    }),
    updateAdvertAds: builder.mutation<void, Advert>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/advert/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['AdvertAds', 'Advert', 'Campaign'],
    }),
    updateAdvertPrices: builder.mutation<void, AdvertPrices>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/${rest.programId}/Multiple`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['AdvertAds', 'Advert', 'Campaign', 'AdvertPrices'],
    }),
    deleteAdvertAds: builder.mutation<void, Advert>({
      query: (id) => ({
        url: `/ModifiedAdvertPlan/advert/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdvertAds', 'Advert', 'Campaign'],
    }),
    deleteAdvert: builder.mutation<void, string>({
      query: (id) => ({
        url: `/ModifiedAdvertPlan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advert', 'Campaign'],
    }),
  }),
});

export const {
  useAdvertsQuery,
  useAdvertQuery,
  useAdvertPricesQuery,
  useAddAdvertMutation,
  useAddMultipleAdvertMutation,
  useUpdateAdvertMutation,
  useUpdateAdvertAdsMutation,
  useUpdateAdvertPricesMutation,
  useDeleteAdvertAdsMutation,
  useDeleteAdvertMutation,
} = advertApi;
