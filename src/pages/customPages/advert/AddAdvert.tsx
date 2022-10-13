import React, { useEffect } from 'react';
import { useAddAdvertMutation } from 'src/services/AdvertApi';
import AdvertForm from '../../../components/customComponents/advertComponent/AdvertForm';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { toast } from 'react-hot-toast';

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
      console.log(response.isSuccess);
      toast("Success!");
      navigate('/dashboard/advert/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    addAdvert(data);
  };

  console.log(response)

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'Add'}
        parentLink={'/dashboard/advert/list'}
      />
      <AdvertForm formTitle={'Add Advert'} defaultValues={initialValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default AddAdvert;
