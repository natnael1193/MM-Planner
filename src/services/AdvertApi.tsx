import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Advert } from '../interfaces/Advert.interface';
const baseURL = `http://localhost:4000`;

export const advertApi = createApi({
  reducerPath: 'advertApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['Advert'],
  endpoints: (builder) => ({
    adverts: builder.query<Advert[], void>({
      query: () => '/advert',
      providesTags: ['Advert'],
    }),
    advert: builder.query<Advert, string>({
      query: (id) => `/advert/${id}`,
      providesTags: ['Advert'],
    }),
    addAdvert: builder.mutation<void, Advert>({
      query: (advert) => ({
        url: '/advert',
        method: 'POST',
        body: advert,
      }),
      invalidatesTags: ["Advert"]
    }),
    updateAdvert: builder.mutation<void, Advert>({
      query: ({ id, ...rest }) => ({
          url: `/advert/${id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ["Advert"]
  }),
  deleteAdvert: builder.mutation<void, string>({
      query: (id) => ({
          url: `/advert/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['Advert']
  })
  }),
});

export const { useAdvertsQuery, useAdvertQuery, useAddAdvertMutation, useUpdateAdvertMutation, useDeleteAdvertMutation } = advertApi;
