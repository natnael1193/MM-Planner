import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spot } from 'src/interfaces/Spot.interface';
// const baseURL = `${process.env.REACT_APP_API_SERVER}`
const baseURL = `http://localhost:4000`;

export const spotApi = createApi({
  reducerPath: 'spotApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['Spot'],
  endpoints: (builder) => ({
    spots: builder.query<Spot[], void>({
      query: () => '/spot',
      providesTags: ['Spot'],
    }),
    spot: builder.query<Spot, string>({
      query: (id) => `spot/${id}`,
      providesTags: ['Spot'],
    }),
    addSpot: builder.mutation<void, Spot>({
      query: (spot) => ({
        url: '/spot',
        method: 'POST',
        body: spot,
      }),
      invalidatesTags: ["Spot"]
    }),
    updateSpot: builder.mutation<void, Spot>({
      query: ({ id, ...rest }) => ({
          url: `Spot/${id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ["Spot"]
  }),
  deleteSpot: builder.mutation<void, string>({
      query: (id) => ({
          url: `Spot/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['Spot']
  })
  }),
});

export const { useSpotsQuery, useSpotQuery, useAddSpotMutation, useUpdateSpotMutation, useDeleteSpotMutation } = spotApi;
