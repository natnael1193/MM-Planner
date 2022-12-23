import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Campaign } from '../interfaces/Campaign.interface';
import { Advert, Adverts, AdvertAds, AdvertPrices } from '../interfaces/Advert.interface';

// const baseURL = `http://localhost:4000`;

const baseURL = `${process.env.REACT_APP_API_SERVER}`;
const token: any = localStorage.getItem('login_token');
const baseToken = JSON.parse(token);

export const campaignApi = createApi({
  reducerPath: 'campaign',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = baseToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Campaign', 'Advert', 'Adverts'],
  endpoints: (builder) => ({
    campaigns: builder.query<Campaign[], void>({
      // query: () => 'Campaign',
      query: () => 'ModifiedCampain',
      providesTags: ['Campaign', 'Advert', 'Adverts'],
    }),
    campaign: builder.query<[Campaign, Adverts], string>({
      query: (id) => `ModifiedCampain/${id}`,
      providesTags: ['Campaign', 'Advert', 'Adverts'],
    }),
    addCampaign: builder.mutation<void, Campaign>({
      query: (campaign) => ({
        url: 'ModifiedCampain',
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: ['Campaign', 'Advert', 'Adverts'],
    }),
    updateCampaign: builder.mutation<void, Campaign>({
      query: ({ ...rest }) => ({
        url: `ModifiedCampain/${rest.id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Campaign', 'Advert', 'Adverts'],
    }),

    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({
        url: `ModifiedCampain/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Campaign', 'Advert'],
    }),
  }),
});

export const {
  useCampaignsQuery,
  useCampaignQuery,
  useAddCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignApi;
