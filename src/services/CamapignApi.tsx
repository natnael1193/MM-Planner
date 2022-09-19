import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VoidFunctionComponent } from 'react';
import { Campaign } from '../interfaces/Campaign.interface';

// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const baseToken = `${process.env.REACT_APP_API_TOKEN}`;

export const campaignApi = createApi({
  reducerPath: 'campaign',
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
  tagTypes: ['Campaign'],
  endpoints: (builder) => ({
    campaigns: builder.query<Campaign[], void>({
      // query: () => 'Campaign',
      query: () => 'Campain',
      providesTags: ['Campaign'],
    }),
    campaign: builder.query<Campaign, string>({
      query: (id) => `Campain/${id}`,
      providesTags: ['Campaign'],
    }),
    addCampaign: builder.mutation<void, Campaign>({
      query: (campaign) => ({
        url: 'Campain',
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: ['Campaign'],
    }),
    updateCampaign: builder.mutation<void, Campaign>({
      query: ({ ...rest }) => ({
        url: `Campain/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Campaign'],
    }),

    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({
        url: `Campain/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Campaign'],
    }),
  }),
});


export const { useCampaignsQuery, useCampaignQuery, useAddCampaignMutation, useUpdateCampaignMutation, useDeleteCampaignMutation } = campaignApi