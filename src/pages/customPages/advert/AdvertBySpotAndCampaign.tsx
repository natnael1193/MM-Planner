import React from 'react';
import AdvertBySpotCampaignComponent from 'src/components/customComponents/advertComponent/AdvertBySpotAndCampaignComponent';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const AdvertBySpotCampaign = () => {
  const {
    data: campaignData,
    isLoading: campaignLoading,
    error: campaignError,
  }: any = useCampaignsQuery();

  if (campaignLoading) return <Loading />;
  if (campaignError) return <Error />;

  console.log(campaignData);
  return (
    <div>
      <AdvertBySpotCampaignComponent campaignData={campaignData.data} />
    </div>
  );
};

export default AdvertBySpotCampaign;
