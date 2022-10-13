import React from 'react';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import CampaingListComponent from '../../../components/customComponents/campaignComponent/CampaingListComponent';
import BreadCrumb from '../breadCrumb/BreadCrumb';

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
          <BreadCrumb
        main={'Dashboard'}
        parent={'Campaign'}
        child={'List'}
        parentLink={'/dashboard/campaign/list'}
      />
    <CampaingListComponent campaignData={campaignData.data} dataGridTitle={"Campaign List"}/>
  </div>;
};

export default CampaignList;
