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

const CampaignDetail = () => {
  const params = useParams();
  const paramsId: any = params.campaignId;
  var defaultValues: any = {};

  //Get Campaign By Id
  const { data: campaignData, error, isLoading, isSuccess }: any = useCampaignQuery(paramsId);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  if (isSuccess) {
    // defaultValues = campaignData;
    //Assign the data to a variable
    defaultValues = {
      id: campaignData.data.id,
      key: campaignData.data.key,
      name: campaignData.data.name,
      startDate: moment(campaignData.data.startDate).format(' dddd Do, MMMM YYYY'),
      // startDate: campaignData.data.startDate.replace(/.203Z/g, ''),
      endDate: moment(campaignData.data.endDate).format(' dddd Do, MMMM YYYY'),
      advertPlans: campaignData.data.advertPlans,
    };
  }

  console.log(defaultValues);

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
            {defaultValues.startDate} - {defaultValues.endDate}{' '}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
          <AdvertPlanListComponent
            advertPlanData={defaultValues.advertPlans}
            dataGridTitle={'Advert Plans'}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignDetail;
