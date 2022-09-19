import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAdvertScheduleQuery,
  useUpdateAdvertScheduleMutation,
} from 'src/services/AdvertSchduleApi';

import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertScheduleForm from 'src/components/customComponents/advertSchedule/AdvertScheduleForm';

const EditAdvertSchedule = () => {
  const params = useParams();
  const paramsId: any = params.advertScheduleId;
  var defaultValues: any = {};

  //Get Campaign By Id
  const {
    data: advertScheduleData,
    error,
    isLoading,
    isSuccess,
  }: any = useAdvertScheduleQuery(paramsId);

  //Update the data
  const [updateAdvertSchedule, result] = useUpdateAdvertScheduleMutation();

  //Check the stauts
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

  if (isSuccess) {
    defaultValues = advertScheduleData.data;
  }

  const onSubmit = (data: any) => {
    updateAdvertSchedule(data);
  };

  return (
    <div>
      <AdvertScheduleForm
        formTitle={'Edit Advert Schedule'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default EditAdvertSchedule;
