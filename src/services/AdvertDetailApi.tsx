import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdvertDetail } from '../interfaces/AdvertDetail.interface';
// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token')
const baseToken = JSON.parse(token)

export const advertDetailApi = createApi({
  reducerPath: 'advertDetailApi',
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
  tagTypes: ['AdvertDetail'],
  endpoints: (builder) => ({
    advertDetails: builder.query<AdvertDetail[], void>({
      query: () => '/AdvertDetail',
      providesTags: ['AdvertDetail'],
    }),
    advertDetail: builder.query<AdvertDetail, string>({
      query: (id) => `/AdvertDetail/${id}`,
      providesTags: ['AdvertDetail'],
    }),
    addAdvertDetail: builder.mutation<void, AdvertDetail>({
      query: (advertDetail) => ({
        url: '/AdvertDetail',
        method: 'POST',
        body: advertDetail,
      }),
      invalidatesTags: ["AdvertDetail"]
    }),
    updateAdvertDetail: builder.mutation<void, AdvertDetail>({
      query: ({ id, ...rest }) => ({
          url: `/AdvertDetail/${id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ["AdvertDetail"]
  }),
  deleteAdvertDetail: builder.mutation<void, string>({
      query: (id) => ({
          url: `/AdvertDetail/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['AdvertDetail']
  })
  }),
});

export const { useAdvertDetailsQuery, useAdvertDetailQuery, useAddAdvertDetailMutation, useUpdateAdvertDetailMutation, useDeleteAdvertDetailMutation } = advertDetailApi;
