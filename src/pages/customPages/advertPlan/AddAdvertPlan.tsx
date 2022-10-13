import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAdvertPlanMutation } from 'src/services/AdvertPlanApi';
import AdvertPlanForm from '../../../components/customComponents/advertPlanComponent/AdvertPlanForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

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
    addAdvertPlan(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Plan'}
        child={'Add'}
        parentLink={'/dashboard/advert-plan/list'}
      />
      <AdvertPlanForm onFormSubmit={onSubmit} defaultValues={initialValues} />
    </div>
  );
};

export default AddAdvertPlan;
