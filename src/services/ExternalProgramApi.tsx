import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ExternalProgramInterface,
  ExternalPriceCategory,
  ExternalPriceConfig,
  ExternalStation,
} from 'src/interfaces/ExternalProgram.interface';

// const baseURL = `http://localhost:4000`;

// ExternalProgramInterface

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

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
  tagTypes: ['ExternalProgramInterface', 'ExternalPriceConfig', 'ExternalStation'],
  endpoints: (builder) => ({
    externalPrograms: builder.query<ExternalProgramInterface[], void>({
      query: () => '/Program',
      providesTags: ['ExternalProgramInterface'],
    }),
    externalProgramsByDays: builder.query<any, { day: string; page: number }>({
      query: (arg) => {
        const { day, page = 1 } = arg;
        console.log('arg: ', arg);
        return {
          url: `/Schedule/${day}/Programs/?pageNumber=${page}`,
          params: { day, page },
        };
      },
      providesTags: ['ExternalProgramInterface'],
    }),
    externalProgramsByStationAndDays: builder.query<
      any,
      { stationId: any; day: string; page: number }
    >({
      query: (arg) => {
        const { stationId, day, page = 1 } = arg;
        console.log('arg: ', arg);
        return {
          url: `/Schedule/${stationId}/${day}/Programs/?pageNumber=${page}`,
          params: { stationId, day, page },
        };
      },
      providesTags: ['ExternalProgramInterface'],
    }),
    // externalProgramsByDays: builder.query<any, { day: string; page: number }>({
    //   query: (arg) => {
    //     const { day, page = 1 } = arg;
    //     console.log('arg: ', arg);
    //     return {
    //       url: `/Schedule/${day}/Programs/?pageNumber=${page}`,
    //       params: { day, page },
    //     };
    //   },
    //   providesTags: ['ExternalProgramInterface'],
    // }),
    externalPriceCategories: builder.query<ExternalPriceCategory, string>({
      query: (stationId) => `/PriceCategory/${stationId}/Prices`,
      providesTags: ['ExternalProgramInterface'],
    }),
    extenalPriceConfigs: builder.query<ExternalPriceConfig[], void>({
      query: () => `/PriceConfig`,
      providesTags: ['ExternalPriceConfig'],
    }),
    externalStations: builder.query<ExternalStation[], void>({
      query: () => `/Station`,
      providesTags: ['ExternalStation'],
    }),
    externalStation: builder.query<ExternalStation, any>({
      query: (id) => `/Station/${id}`,
      providesTags: ['ExternalStation'],
    }),
  }),
});

export const {
  useExternalProgramsQuery,
  useExternalProgramsByDaysQuery,
  useExternalProgramsByStationAndDaysQuery,
  useExternalPriceCategoriesQuery,
  useExtenalPriceConfigsQuery,
  useExternalStationsQuery,
  useExternalStationQuery
} = externalProgramApi;
