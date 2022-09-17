import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SpotContent } from 'src/interfaces/SpotContent.interface';
// const baseURL = `${process.env.REACT_APP_API_SERVER}`
// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;


export const spotContentApi = createApi({
  reducerPath: 'spotContentApi',
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
  tagTypes: ['SpotContent'],
  endpoints: (builder) => ({
    spotContents: builder.query<SpotContent[], void>({
      query: () => '/SpotContent',
      providesTags: ['SpotContent'],
    }),
    spotContent: builder.query<SpotContent, string>({
      query: (id) => `SpotContent/${id}`,
      providesTags: ['SpotContent'],
    }),
    addSpotContent: builder.mutation<void, SpotContent>({
      query: (spotContent) => ({
        url: '/SpotContent',
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
