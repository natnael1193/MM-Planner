import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExternalProgramInterface } from 'src/interfaces/ExternalProgram.interface';

const baseURL = `http://localhost:4000`;

// ExternalProgramInterface

export const externalProgramApi = createApi({
    reducerPath: 'externalProgramInterface',
    baseQuery: fetchBaseQuery({
      baseUrl: `${baseURL}`,
    }),
    tagTypes: ['ExternalProgramInterface'],
    endpoints: (builder) => ({
      externalPrograms: builder.query<ExternalProgramInterface[], void>({
        query: () => '/externalPrograms',
        providesTags: ['ExternalProgramInterface'],
      }),
     
    }),
  });

  export const { useExternalProgramsQuery } = externalProgramApi;