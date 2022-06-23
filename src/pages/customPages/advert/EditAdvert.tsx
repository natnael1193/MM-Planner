import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertForm from 'src/components/customComponents/advert/AdvertForm';
import { useAdvertQuery, useUpdateAdvertMutation } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const EditAdvert = () => {
  const params = useParams();
  const paramsId: any = params.advertId;
  var defaultValues: any = {};

  //Get Advert  By Id
  const { data: advertData, error, isLoading } = useAdvertQuery(paramsId);

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

  defaultValues = advertData;
  const onSubmit = (data: any) => {
    console.log(data);
    updateAdvert(data);
  };

  return (
    <div>
      <AdvertForm
        formTitle={'Edit Advert '}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );

};

export default EditAdvert;
