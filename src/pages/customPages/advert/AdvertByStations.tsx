import React from 'react';
import { useAdvertByStationQuery } from 'src/services/AdvertApi';
import Error from '../shared/Error';
import Loading from '../shared/Loading';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import AdvertPlanListComponent from 'src/components/customComponents/advertPlanComponent/AdvertPlanListComponent';
import { useExternalStationQuery } from 'src/services/ExternalProgramApi';

const AdvertByStations = () => {
  const stationId = useParams();
  const [campaignId, setCampaignId] = React.useState('ec49a656-e7ae-49f8-a6c8-395575caad88');

  const {
    data: stationData,
    isLoading: stationLoading,
    isError: stationError,
  }: any = useExternalStationQuery(stationId.stationId);
  const {
    data: advertData,
    isLoading: advertLoading,
    isError: advertError,

    refetch,
  } = useAdvertByStationQuery({ stationId: stationId.stationId, campaignId: campaignId });
  const {
    data: campaignData,
    isLoading: campaignLoading,
    isError: campaignError,
    isSuccess: campaignSuccess,
  }: any = useCampaignsQuery();

  React.useEffect(() => {
    if (campaignSuccess) {
      let defaultCampaignId = campaignData.data[campaignData.data.length-1]?.id;
      console.log(defaultCampaignId);
      setCampaignId(defaultCampaignId);
    }
  }, []);

  if (advertLoading || campaignLoading || stationLoading) return <Loading />;
  if (advertError || campaignError || stationError) return <Error />;

  console.log(campaignData);
  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <AdvertPlanListComponent
          advertPlanData={advertData.data}
          dataGridTitle={stationData?.data?.name}
          campaignData={campaignData.data}
          campaignId={campaignId}
          setCampaignId={setCampaignId}
          stationId={stationData?.data?.id}
          stationData={stationData?.data}
          refetch={refetch}
          // {...{}}
          // refetch={refetch}
        />
      </Grid>
    </Grid>
  );
};

export default AdvertByStations;
