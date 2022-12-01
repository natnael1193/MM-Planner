import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdvertQuery, useUpdateAdvertMutation } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import EditAdvertForm from 'src/components/customComponents/advertComponent/EditAdvertForm';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Typography } from '@mui/material';

const EditAdvert = () => {
  const params = useParams();
  const paramsId: any = params.advertId;
  var defaultValues: any = {};

  //Get Advert By Id
  const { data: advertData, error, isLoading, isFetching }: any = useAdvertQuery(paramsId);

  //Update the data
  const [updateAdvert, result] = useUpdateAdvertMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status);
    }
    if (response.isError) {
      toast.error('Error ' + response.error.data.error);
    }
  }, [response]);

  //Loading State
  if (isLoading || isFetching) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  // console.log(advertData)
  defaultValues = {
    adsId: advertData.data.adsId,
    advertType: advertData.data?.schedule.priceConfig?.priceCategory?.priceType,
    endTime: advertData.data.schedule.endTime.replace(/Z/, ''),
    startTime: advertData.data.schedule.startTime.replace(/Z/, ''),
    id: advertData.data.id,
    modifiedCampainId: advertData.data.modifiedCampainId,
    qut: advertData.data.qut,
    scheduleId: advertData.data.schedule.id,
    sponsorLength: advertData.data.sponsorLength,
    priceConfigId: advertData?.data?.schedule.priceConfig?.id,
    adverts: advertData.data.adverts,
    programId: advertData.data?.schedule.programId,
    programName: advertData.data?.schedule.program?.name,
  };
  const onSubmit = (data: any) => {
    console.log(data);
    const newData: any = {
      id: data.id,
      startTime: data.startTime.concat('Z'),
      endTime: data.endTime.concat('Z'),
      advertType: data.advertType,
      modifiedCampainId: data.modifiedCampainId,
      scheduleId: data.scheduleId,
      priceConfigId: data.priceConfigId,
    };
    updateAdvert(newData);
  };

  console.log(advertData);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'Edit'}
        parentLink={'/dashboard/advert/list'}
      />
      <Typography variant="h4" sx={{ mb: 2 }}>
        {defaultValues.programName}
      </Typography>
      <EditAdvertForm defaultValues={defaultValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default EditAdvert;
