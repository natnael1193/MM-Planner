import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertForm from 'src/components/customComponents/advertComponent/AdvertForm';
import { useAdvertQuery, useUpdateAdvertMutation } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import EditAdvertForm from 'src/components/customComponents/advertComponent/EditAdvertForm';
import toast from 'react-hot-toast';
import moment from 'moment';

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
      //  toast.success(response.data.status)
    }
    if (response.isError) {
      //  toast.error(response.error.data.error)
    }
  }, [response]);

  //Loading State
  if (isLoading || isFetching) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  defaultValues = {
    adsId: advertData.data.adsId,
    advertType: advertData.data.priceConfig.priceCategory.priceType,
    endTime: advertData.data.endTime.replace(/Z/, ''),
    startTime: advertData.data.startTime.replace(/Z/, ''),
    id: advertData.data.id,
    modifiedCampainId: advertData.data.modifiedCampainId,
    qut: advertData.data.qut,
    scheduleId: advertData.data.scheduleId,
    sponsorLength: advertData.data.sponsorLength,
    priceConfigId: advertData.data.priceConfig.id,
    adverts: advertData.data.adverts,
  };
  const onSubmit = (data: any) => {
    console.log(data);
    updateAdvert(data);
    return toast.success('Updated Successfully');
  };

  console.log(defaultValues);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'Edit'}
        parentLink={'/dashboard/advert/list'}
      />
      <EditAdvertForm defaultValues={defaultValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default EditAdvert;
