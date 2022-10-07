import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaignQuery, useUpdateCampaignMutation } from 'src/services/CamapignApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import CampaignForm from 'src/components/customComponents/campaignComponent/CampaignForm';
import moment from 'moment';
import toast from 'react-hot-toast';

const EditCampaign = () => {
  const params = useParams();
  const paramsId: any = params.campaignId;
  var defaultValues: any = {};

  //Get Campaign By Id
  const { data: campaignData, error, isLoading, isSuccess }: any = useCampaignQuery(paramsId);

  //Update the data
  const [updateCampaing, result] = useUpdateCampaignMutation();

  //Check the stauts
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
       toast.success("Updated Successfully!");
    }
    if (response.isError) {
       toast.error("Error, Something went wrong!");
    }
  }, [response]);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  if (isSuccess) {
    // defaultValues = campaignData;
    //Assign the data to a variable
    defaultValues = {
      id: campaignData.data.id,
      key: campaignData.data.key,
      name: campaignData.data.name,
      startDate: moment(campaignData.data.startDate).format().replace('+03:00', ''),
      // startDate: campaignData.data.startDate.replace(/.203Z/g, ''),
      endDate: moment(campaignData.data.endDate).format().replace('+03:00', ''),
    };
  }

  const onSubmit = (data: any) => {
    const newData: any = {
      id: data.id,
      name: data.name,
      key: data.key,
      startDate: data.startDate + 'Z',
      endDate:  data.endDate + 'Z',
    };
    updateCampaing(newData);
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
