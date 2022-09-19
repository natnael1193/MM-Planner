import React from 'react';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import CampaingListComponent from '../../../components/customComponents/campaignComponent/CampaingListComponent';

const CampaignList = () => {
  let campaignData: any = [];

  //Get all campaign
  const { data, error, isLoading, isSuccess } = useCampaignsQuery();

  if (isLoading) return <Loading />;
  if (isSuccess) {
    campaignData = data;
  }
  if (error) return <Error />;

  return <div>
    <CampaingListComponent campaignData={campaignData.data} dataGridTitle={"Campaign List"}/>
  </div>;
};

export default CampaignList;
