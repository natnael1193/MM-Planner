import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaignQuery, useUpdateCampaignMutation } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import CampaignForm from 'src/components/customComponents/campaignComponent/CampaignForm';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Grid, Typography } from '@mui/material';
import AdvertPlanListComponent from 'src/components/customComponents/advertPlanComponent/AdvertPlanListComponent';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { useExternalStationsQuery } from 'src/services/ExternalProgramApi';

const CampaignDetail = () => {
  const params = useParams();
  const paramsId: any = params.campaignId;
  var defaultValues: any = {};

  // Get All Stations
  const {
    data: stationsData,
    error: stationsError,
    isLoading: stationsLoading,
  }: any = useExternalStationsQuery();

  //Get Campaign By Id
  const {
    data: campaignData,
    error,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  }: any = useCampaignQuery(paramsId);



  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [refetch]);

  //Loading State
  if (isLoading || stationsLoading) return <Loading />;

  // Return an error if there is an error
  if (error || stationsError) return <Error />;

  if (isSuccess) {
    defaultValues = campaignData.data;
    console.log(defaultValues);
    //Assign the data to a variable
    // defaultValues = {
    //   id: defaultValues.id,
    //   key: defaultValues.key,
    //   name: defaultValues.name,
    // //   startDate: moment(campaignData.data.schedule.startDate).format(' dddd Do, MMMM YYYY'),
    // //   // startDate: campaignData.data.startDate.schedule.replace(/.203Z/g, ''),
    // //   endDate: moment(campaignData.data.schedule.endDate).format(' dddd Do, MMMM YYYY'),
    // //   advertPlans: campaignData.data.advertPlans,
    // };
  }

  console.log('defaultValues.......', defaultValues);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Campaign'}
        child={'Detail'}
        parentLink={'/dashboard/campaign/list'}
      />
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">{defaultValues.name}</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
          <Typography variant="h5">
            {' '}
            {moment.utc(defaultValues.startDate).format('MMMM DD, YYYY')} -{' '}
            {moment.utc(defaultValues.endDate).format('MMMM DD, YYYY')}{' '}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3}}>
          <AdvertPlanListComponent
            advertPlanData={defaultValues.advertPlans}
            stationData={stationsData.data}
            dataGridTitle={'Advert Plans'}
            defaultValueCampaignId={defaultValues.id}
            refetch={refetch}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignDetail;
