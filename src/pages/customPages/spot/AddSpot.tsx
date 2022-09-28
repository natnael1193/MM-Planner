import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAddSpotMutation } from 'src/services/SpotApi';

import BreadCrumb from '../breadCrumb/BreadCrumb';
import SpotForm from '../../../components/customComponents/spotComponent/SpotForm';

const AddSpot = () => {
  const navigate = useNavigate();

  //Initial Values Of Spot
  const initialValues = {
    key: '',
    contentType: '',
    contentLength: '',
    spotContentIds: [],
  };

  //Add New Data
  const [addSpot, result] = useAddSpotMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/spot/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    console.log(data);
    addSpot(data);
  };


  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Spot'}
        child={'Add'}
        parentLink={'/dashboard/spot/list'}
      />
      <SpotForm formTitle={'Add Spot'} defaultValues={initialValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default AddSpot;
