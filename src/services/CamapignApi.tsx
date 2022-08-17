import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VoidFunctionComponent } from 'react';
import { Campaign } from '../interfaces/Campaign.interface';
const baseURL = `http://localhost:4000`;

export const campaignApi = createApi({
  reducerPath: 'campaign',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
  }),
  tagTypes: ['Campaign'],
  endpoints: (builder) => ({
    campaigns: builder.query<Campaign[], void>({
      query: () => '/campaign',
      providesTags: ['Campaign'],
    }),
    campaign: builder.query<Campaign, string>({
      query: (id) => `/campaign/${id}`,
      providesTags: ['Campaign'],
    }),
    addCampaign: builder.mutation<void, Campaign>({
      query: (campaign) => ({
        url: '/campaign',
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: ['Campaign'],
    }),
    updateCampaign: builder.mutation<void, Campaign>({
      query: ({ id, ...rest }) => ({
        url: `/campaign/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Campaign'],
    }),

    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({
        url: `/campaign/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Campaign'],
    }),
  }),
});


export const { useCampaignsQuery, useCampaignQuery, useAddCampaignMutation, useUpdateCampaignMutation, useDeleteCampaignMutation } = campaignApi