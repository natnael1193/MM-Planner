import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpotForm from 'src/components/customComponents/spotComponent/SpotForm';
import { useSpotQuery, useUpdateSpotMutation } from 'src/services/SpotApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import toast from 'react-hot-toast';

const EditSpot = () => {
  const params = useParams();
  const paramsId: any = params.spotId;
  var defaultValues: any = {};

  //Get Spot Content By Id
  const { data: spotData, error, isLoading } = useSpotQuery(paramsId);

  // Update the data
  const [updateSpot, result] = useUpdateSpotMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Updated Successfully!");
    }
    if (response.isError) {
       toast.error("Error, Something went wrong!")
    }
  }, [response]);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  //Assign the data to a variable
  defaultValues = spotData;

  const onSubmit = (data: any) => {
    console.log(data);
    updateSpot(data);
  };
  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Spot'}
        child={'Edit'}
        parentLink={'/dashboard/spot/list'}
      />
      <SpotForm formTitle={'Edit Spot'} defaultValues={defaultValues.data} onFormSubmit={onSubmit} />
    </div>
  );
};

export default EditSpot;
