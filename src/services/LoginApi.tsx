import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login } from 'src/interfaces/Login.interface';

// const baseURL = `http://localhost:8000/api/Account/authenticate`;
const baseURL = `${process.env.REACT_APP_AUTH_API_SERVER}`;
// const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['Login'],
  endpoints: (builder) => ({
    login: builder.mutation<void, Login>({
      query: (spot) => ({
        url: '/',
        method: 'POST',
        body: spot,
      }),
      invalidatesTags: ['Login'],
    }),

  }),
});

export const {
  useLoginMutation,
} = loginApi;
