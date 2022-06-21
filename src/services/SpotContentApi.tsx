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
      providesTags: ['SpotContent']
    }),
  }),
});

export const { useSpotContentsQuery } = spotContentApi;
