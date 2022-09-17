import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertForm from 'src/components/customComponents/advertComponent/AdvertForm';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { useAdvertPlanQuery, useUpdateAdvertPlanMutation } from 'src/services/AdvertPlanApi';
import AdvertPlanForm from 'src/components/customComponents/advertPlanComponent/AdvertPlanForm';

const EditAdvertPlan = () => {

  const params = useParams();
  const paramsId: any = params.advertPlanId;
  var defaultValues: any = {};

    //Get Advert Plan By Id
    const { data: advertPlanData, error, isLoading } = useAdvertPlanQuery(paramsId);

    //Update the data
    const [updateAdvert, result] = useUpdateAdvertPlanMutation();

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


  defaultValues = advertPlanData;
  const onSubmit = (data: any) => {
    console.log(data);
    updateAdvert(data);
  };
    
  return (
    <div>
      <AdvertPlanForm
        formTitle={'Edit Advert Plan'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  )
}

export default EditAdvertPlan