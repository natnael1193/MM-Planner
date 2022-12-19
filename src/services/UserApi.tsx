import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Register } from 'src/interfaces/Register.interface';

const baseURL = `http://localhost:8000/api/`;
// const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['Register'],
  endpoints: (builder) => ({
    allUsers: builder.query<Register, number | void>({
      query: () => `Account/all-users`,
      providesTags: ['Register'],
    }),
    getUserById: builder.query<Register, number | void>({
      query: (id) => `Account/${id}`,
      providesTags: ['Register'],
    }),
    updateUser: builder.mutation<void, Register>({
      query: ({ ...rest }) => ({
        url: `Account/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Register'],
    }),
    deleteUser: builder.mutation<void, Register>({
      query: (id) => ({
        url: `/Account/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});

export const { useAllUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;
