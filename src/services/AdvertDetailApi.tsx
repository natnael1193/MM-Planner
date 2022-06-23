import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdvertDetail } from '../interfaces/AdvertDetail.interface';
const baseURL = `http://localhost:4000`;

export const advertDetailApi = createApi({
  reducerPath: 'adDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['AdvertDetail'],
  endpoints: (builder) => ({
    advertDetails: builder.query<AdvertDetail[], void>({
      query: () => '/advertDetail',
      providesTags: ['AdvertDetail'],
    }),
    advertDetail: builder.query<AdvertDetail, string>({
      query: (id) => `/advertDetail/${id}`,
      providesTags: ['AdvertDetail'],
    }),
    addAdvertDetail: builder.mutation<void, AdvertDetail>({
      query: (advertDetail) => ({
        url: '/advertDetail',
        method: 'POST',
        body: advertDetail,
      }),
      invalidatesTags: ["AdvertDetail"]
    }),
    updateAdvertDetail: builder.mutation<void, AdvertDetail>({
      query: ({ id, ...rest }) => ({
          url: `/advertDetail/${id}`,
          method: "PUT",
          body: rest
      }),
      invalidatesTags: ["AdvertDetail"]
  }),
  deleteAdvertDetail: builder.mutation<void, string>({
      query: (id) => ({
          url: `/advertDetail/${id}`,
          method: 'DELETE'
      }),
      invalidatesTags: ['AdvertDetail']
  })
  }),
});

export const { useAdvertDetailsQuery, useAdvertDetailQuery, useAddAdvertDetailMutation, useUpdateAdvertDetailMutation, useDeleteAdvertDetailMutation } = advertDetailApi;
