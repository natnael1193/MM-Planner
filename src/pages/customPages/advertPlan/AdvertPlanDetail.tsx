import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertForm from 'src/components/customComponents/advertComponent/AdvertForm';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { useAdvertPlanQuery, useUpdateAdvertPlanMutation } from 'src/services/AdvertPlanApi';
import AdvertPlanForm from 'src/components/customComponents/advertPlanComponent/AdvertPlanForm';
import { toast } from 'react-toastify';
import AdvertPlanDetailListComponent from '../../../components/customComponents/advertPlanComponent/AdvertPlanDetailListComponent';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { Typography } from '@mui/material';

const AdvertPlanDetail = () => {
  const params = useParams();
  const paramsId: any = params.advertPlanId;
  var defaultValues: any = {};

  //Get Advert Plan By Id
  const { data: advertPlanData, error, isLoading } = useAdvertPlanQuery(paramsId);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  defaultValues = advertPlanData;

  // console.log();

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Plan'}
        child={'Detail'}
        parentLink={'/dashboard/advert-plan/list'}
      />
      <Typography variant="h3">{defaultValues.data.name}</Typography>
      <AdvertPlanDetailListComponent advertPlanDetailData={defaultValues.data.adverts} />
    </div>
  );
};

export default AdvertPlanDetail;
