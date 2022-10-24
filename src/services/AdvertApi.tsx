import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Advert, Adverts } from '../interfaces/Advert.interface';
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
  tagTypes: ['Advert'],
  endpoints: (builder) => ({
    adverts: builder.query<ListResponse<Advert>, number | void>({
      query: (page = 1) => `/Advert/?pageNumber=${page}`,
      providesTags: ['Advert'],
    }),
    advert: builder.query<Advert, string>({
      query: (id) => `/Advert/${id}`,
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
        url: `/Advert/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Advert'],
    }),
    deleteAdvert: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Advert/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advert'],
    }),
  }),
});

export const {
  useAdvertsQuery,
  useAdvertQuery,
  useAddAdvertMutation,
  useAddMultipleAdvertMutation,
  useUpdateAdvertMutation,
  useDeleteAdvertMutation,
} = advertApi;
