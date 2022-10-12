import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertForm from 'src/components/customComponents/advertComponent/AdvertForm';
import { useAdvertQuery, useUpdateAdvertMutation } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import moment from 'moment';
import AdvertDetailList from '../advertDetail/AdvertDetailList';
import AdvertDetailListComponent from '../../../components/customComponents/advertDetailComponent/AdvertDetailListComponent';

const AdvertDetail = () => {
  const params = useParams();
  const paramsId: any = params.advertId;
  var defaultValues: any = {};
  let advertDetailData: any = [];

  //Get Advert By Id
  const { data: advertData, error, isLoading }: any = useAdvertQuery(paramsId);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  advertDetailData = advertData.data?.advertDetails.map(function (advertDetail: any) {
    return {
      id: advertDetail.id,
      // spotId: advertDetail.spot.name,
      advertId: advertDetail.advert.name,
      quantity: advertDetail.quantity,
    };
  });

  console.log(advertDetailData);

  return (
    <div>
      <Grid container sx={{ p: 3 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">{advertData.data.name}</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Typography variant="h6">Advert Plan - {advertData.data.advertPlan.name}</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Typography variant="h6">
            {moment(advertData.data.startTime).format('dddd Do, MMMM YYYY')} -{' '}
            {moment(advertData.data.endTime).format('dddd Do, MMMM YYYY')}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
          <Typography variant="h4">Advert Details</Typography>
          <AdvertDetailListComponent 
          advertDetailData={advertDetailData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdvertDetail;
