import React from 'react';
import AdvertBySpotCampaignComponent from 'src/components/customComponents/advertComponent/AdvertBySpotAndCampaignComponent';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { useStationsQuery } from 'src/services/ExternalScheduleApi';

const AdvertBySpotCampaign = () => {
  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
  }: any = useStationsQuery();

  const {
    data: campaignData,
    isLoading: campaignLoading,
    error: campaignError,
  }: any = useCampaignsQuery();

  if (campaignLoading || stationLoading) return <Loading />;
  if (campaignError || stationError) return <Error />;

  // console.log(campaignData);
  return (
    <div>
      <AdvertBySpotCampaignComponent campaignData={campaignData.data} stationData={stationData.data}/>
    </div>
  );
};

export default AdvertBySpotCampaign;
