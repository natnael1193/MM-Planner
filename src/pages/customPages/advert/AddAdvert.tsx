import React, { useEffect } from 'react';
import { useAddAdvertMutation } from 'src/services/AdvertApi';
import AdvertForm from '../../../components/customComponents/advertComponent/AdvertForm';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { toast } from 'react-hot-toast';
import MultipleAdverForm from 'src/components/customComponents/advertComponent/MultipleAdverForm';

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
      toast('Success!');
      // navigate('/dashboard/advert/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'Add'}
        parentLink={'/dashboard/advert/list'}
      />
      {/* <AdvertForm formTitle={'Add Advert'} defaultValues={initialValues} /> */}
       <MultipleAdverForm />
    </div>
  );
};

export default AddAdvert;
