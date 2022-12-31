import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Advert, Adverts, AdvertAds, AdvertPrices, Recorder } from '../interfaces/Advert.interface';
import { Campaign } from '../interfaces/Campaign.interface';

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
  tagTypes: ['Advert', 'Campaign', 'AdvertAds', 'AdvertPrices', 'AdvertAds', 'Adverts'],
  endpoints: (builder) => ({
    adverts: builder.query<Advert[], void>({
      query: () => `/ModifiedAdvertPlan`,
      providesTags: ['Advert', 'Campaign'],
    }),
    advert: builder.query<Advert, string>({
      query: (id) => `/ModifiedAdvertPlan/${id}`,
      providesTags: ['Advert', 'Campaign'],
    }),
    advertPrices: builder.query<Advert, string>({
      query: (id) => `/ModifiedAdvertPlan/${id}/adverts`,
      providesTags: ['Advert', 'Campaign'],
    }),
    advertByStation: builder.query({
      query: ({ stationId, campaignId }) =>
        `/ModifiedAdvertPlan/${stationId}/Campain/${campaignId}`,
      providesTags: ['Advert', 'Campaign'],
    }),
    addAdvert: builder.mutation<void, Advert>({
      query: (advert) => ({
        url: '/Advert',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ['Advert', 'Campaign'],
      // invalidatesTags: [{ type: 'Advert', id: 'LIST' }],
    }),
    addMultipleAdvert: builder.mutation<void, Omit<[Adverts, Campaign], 'id'>>({
      query: (advert) => ({
        url: '/ModifiedAdvertPlan/multiple',
        method: 'POST',
        body: advert,
      }),

      invalidatesTags: ['Advert', 'Adverts', 'Campaign'],
    }),
    updateAdvert: builder.mutation<void, Advert>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Advert', 'Campaign'],
    }),
    updateAdvertAds: builder.mutation<void, Advert>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/advert/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['AdvertAds', 'Advert', 'Campaign'],
    }),
    updateMultipleAdvertAds: builder.mutation<void, AdvertAds>({
      query: ({ ...rest }) => ({
        url: `/ModifiedAdvertPlan/program/${rest.id}`,
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
    recordAdverts: builder.mutation<void, Recorder>({
      query: (record) => ({
        url: `/ModifiedCampain/Start-Recording`,
        method: 'POST',
        body: record,
      }),
      invalidatesTags: ['AdvertAds', 'Advert', 'Campaign'],
    }),
  }),
});

export const {
  useAdvertsQuery,
  useAdvertQuery,
  useAdvertPricesQuery,
  useAdvertByStationQuery,
  useAddAdvertMutation,
  useAddMultipleAdvertMutation,
  useUpdateAdvertMutation,
  useUpdateAdvertAdsMutation,
  useUpdateMultipleAdvertAdsMutation,
  useUpdateAdvertPricesMutation,
  useDeleteAdvertAdsMutation,
  useDeleteAdvertMutation,
  useRecordAdvertsMutation,
} = advertApi;
