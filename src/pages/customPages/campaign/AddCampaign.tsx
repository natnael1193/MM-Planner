import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddCampaignMutation } from 'src/services/CamapignApi';
import CampaignForm from '../../../components/customComponents/campaignComponent/CampaignForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddCampaign = () => {
  // Initial State
  const initialValues: any = {
    name: '',
    startDate: '',
    endDate: '',
  };

  const navigate = useNavigate();

  //Add New Data
  const [addCampaign, result] = useAddCampaignMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/campaign/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    const newData: any = {
      name: data.name,
      key: data.key,
      startDate: data.startDate + ':00.203Z',
      endDate:  data.endDate + ':00.203Z',
    };
    addCampaign(newData);
  };
  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Campaign'}
        child={'Add'}
        parentLink={'/dashboard/campaign/list'}
      />
      <CampaignForm formTitle={'Add Campaign'} defaultValues={initialValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default AddCampaign;
