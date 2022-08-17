import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaignQuery, useUpdateCampaignMutation } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import CampaignForm from 'src/components/customComponents/campaignComponent/CampaignForm';

const EditCampaign = () => {
  const params = useParams();
  const paramsId: any = params.campaignId;
  var defaultValues: any = {};

  //Get Campaign By Id
  const { data: campaignData, error, isLoading } = useCampaignQuery(paramsId);

  //Update the data
  const [updateCampaing, result] = useUpdateCampaignMutation();

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

  defaultValues = campaignData;

  const onSubmit = (data: any) => {
    updateCampaing(data);
  };

  return (
    <div>
      <CampaignForm
        formTitle={'Edit Campaign '}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default EditCampaign;
