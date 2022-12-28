import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spot } from 'src/interfaces/Spot.interface';

// const baseURL = `http://localhost:4000`;
const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

export const holidayPriceApi = createApi({
  reducerPath: 'holidayPriceApi',
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
  tagTypes: ['Spot'],
  endpoints: (builder) => ({
    holidayPrices: builder.query<Spot[], void>({
      query: () => '/AdvertDetail',
      providesTags: ['Spot'],
    }),
    holidayPrice: builder.query<Spot, string>({
      query: (id) => `AdvertDetail/${id}`,
      providesTags: ['Spot'],
    }),
    addHolidayPrice: builder.mutation<void, Spot>({
      query: (spot) => ({
        url: '/AdvertDetail',
        method: 'POST',
        body: spot,
      }),
      invalidatesTags: ['Spot'],
    }),
    updateHolidayPrice: builder.mutation<void, Spot>({
      query: ({ ...rest }) => ({
        url: `AdvertDetail/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Spot'],
    }),
    deleteHolidayPrice: builder.mutation<void, string>({
      query: (id) => ({
        url: `AdvertDetail/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Spot'],
    }),
  }),
});

export const {
  useHolidayPricesQuery,
  useHolidayPriceQuery,
  useAddHolidayPriceMutation,
  useUpdateHolidayPriceMutation,
  useDeleteHolidayPriceMutation,
} = holidayPriceApi;
