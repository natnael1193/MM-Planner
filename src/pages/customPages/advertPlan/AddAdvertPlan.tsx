import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAdvertPlanMutation } from 'src/services/AdvertPlanApi';
import AdvertPlanForm from '../../../components/customComponents/advertPlanComponent/AdvertPlanForm';

const AddAdvertPlan = () => {
  const navigate = useNavigate();

  //Initial Values Of Spot
  const initialValues = {
    name: '',
    description: '',
    campaignId: '',
  };

   //Add New Data
   const [addAdvertPlan, result] = useAddAdvertPlanMutation();

   //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/advert-plan/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    console.log(data);
    addAdvertPlan(data);
  };

  return (
    <div>
      <AdvertPlanForm onFormSubmit={onSubmit} defaultValues={initialValues}/>
    </div>
  );
};

export default AddAdvertPlan;
