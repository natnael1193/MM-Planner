import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SpotContent } from 'src/interfaces/SpotContent.interface';
// const baseURL = `${process.env.REACT_APP_API_SERVER}`
const baseURL = `http://localhost:4000`;

export const spotContentApi = createApi({
  reducerPath: 'spotContentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['SpotContent'],
  endpoints: (builder) => ({
    spotContents: builder.query<SpotContent[], void>({
      query: () => '/spotContent',
      providesTags: ['SpotContent'],
    }),
    spotContent: builder.query<SpotContent, string>({
      query: (id) => `spotContent/${id}`,
      providesTags: ['SpotContent'],
    }),
    addSpotContent: builder.mutation<void, SpotContent>({
      query: (spotContent) => ({
        url: '/spotContent',
        method: 'POST',
        body: spotContent,
      }),
      invalidatesTags: ["SpotContent"]
    }),
    updateSpotContent: builder.mutation<void, SpotContent>({
      query: ({ id, ...rest }) => ({
          url: `SpotContent/${id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ["SpotContent"]
  }),
  deleteSpotContent: builder.mutation<void, string>({
      query: (id) => ({
          url: `SpotContent/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['SpotContent']
  })
  }),
});

export const { useSpotContentsQuery, useSpotContentQuery, useAddSpotContentMutation, useUpdateSpotContentMutation, useDeleteSpotContentMutation } = spotContentApi;
