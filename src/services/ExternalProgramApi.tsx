import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExternalProgramInterface, ExternalPriceCategory, ExternalPriceConfig } from 'src/interfaces/ExternalProgram.interface';

// const baseURL = `http://localhost:4000`;

// ExternalProgramInterface

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

export const externalProgramApi = createApi({
  reducerPath: 'externalProgramInterface',
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
  tagTypes: ['ExternalProgramInterface','ExternalPriceConfig'],
  endpoints: (builder) => ({
    externalPrograms: builder.query<ExternalProgramInterface[], void>({
      query: () => '/externalPrograms',
      providesTags: ['ExternalProgramInterface'],
    }),
    externalProgramsByDays: builder.query<ExternalProgramInterface, string>({
      query: (day) => `/Schedule/${day}/Programs`,
      providesTags: ['ExternalProgramInterface'],
    }),
    externalPriceCategories: builder.query<ExternalPriceCategory, string>({
      query: (stationId) => `/PriceCategory/${stationId}/Prices`,
      providesTags: ['ExternalProgramInterface'],
    }),
    extenalPriceConfigs: builder.query<ExternalPriceConfig[], void>({
      query: () => `/PriceConfig`,
      providesTags: ['ExternalPriceConfig'],
  }),
  }),
});

export const { useExternalProgramsQuery, useExternalProgramsByDaysQuery, useExternalPriceCategoriesQuery, useExtenalPriceConfigsQuery } = externalProgramApi;
