import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Register } from 'src/interfaces/Register.interface';

const baseURL = `http://localhost:8000/api/`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = baseToken;
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Register'],
  endpoints: (builder) => ({
    register: builder.mutation<void, Register>({
      query: (Register) => ({
        url: '/Account/register',
        method: 'POST',
        body: Register,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
