import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pagination } from 'src/interfaces/Test';
const baseURL = `https://jsonplaceholder.typicode.com/`;


interface ListResponse<T> {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T[]
  }
  


export const paginationApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
      listPosts: builder.query<ListResponse<Pagination>, number | void>({
        query: (page = 1) => `comments?postId=${page}`,
      }),
    }),
  })


  export const { useListPostsQuery } = paginationApi