import React, { useEffect } from 'react';
import { useAddAdvertMutation } from 'src/services/AdvertApi';
import AdvertForm from '../../../components/customComponents/advertComponent/AdvertForm';
import { useNavigate } from 'react-router-dom';

const AddAdvert = () => {
  const navigate = useNavigate();
  //Initial Values
  const initialValues: any = {
    name: '',
    adevertType: '',
    advertPlanId: '',
  };

  const [addAdvert, result] = useAddAdvertMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/advert/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    console.log(data)
    // alert(JSON.stringify(data));
    // addAdvert(data);
  };
  return (
    <div>
      <AdvertForm formTitle={'Add Advert'} defaultValues={initialValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default AddAdvert;
