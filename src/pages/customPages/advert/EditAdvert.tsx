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
  const { data: advertData, error, isLoading }: any = useAdvertQuery(paramsId);

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
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  defaultValues = {
    id: advertData.data.id,
    name: advertData.data.name,
    key: advertData.data.key,
    startTime: advertData.data.startTime.replace('Z', ''),
    endTime: advertData.data.endTime.replace('Z', ''),
    advertPlanId: advertData.data.advertPlan.id,
    scheduleId: advertData.data.schedule.id,
  };
  const onSubmit = (data: any) => {
    if (data.startTime > data.endTime) return toast.error('Start time must be less than End time');
    if (moment.utc(data.startTime).format('DD MMMM YYYY') !== moment.utc(data.endTime).format('DD MMMM YYYY')) return toast.error("Dates can't be different");

    console.log(moment.utc(data.startTime).format('dd MMMM YYYY'))
    const newData: any = {
      id: data.id,
      name: data.name,
      key: data.key,
      startTime: data.startTime.concat('Z'),
      endTime: data.endTime.concat('Z'),
      advertPlanId: data.advertPlanId,
      scheduleId: data.scheduleId,
    };
    updateAdvert(newData);
    return toast.success('Updated Successfully');
  };

  // console.log(defaultValues);

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
