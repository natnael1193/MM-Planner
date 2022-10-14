import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSpotContentQuery, useUpdateSpotContentMutation } from 'src/services/SpotContentApi';
import SpotContentForm from '../../../components/customComponents/spotContentComponent/SpotContentForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import Error from '../shared/Error';
import Loading from '../shared/Loading';

const EditSpotContent = () => {
  const params = useParams();
  const paramsId: any = params.spotContentId;
  var defaultValues: any = {};

  //Get Spot Content By Id
  const { data: spotContentData, error, isLoading } = useSpotContentQuery(paramsId);

  // Update the data
  const [updateSpotContent, result] = useUpdateSpotContentMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
       toast.success("Updated Successfully");
    }
    if (response.isError) {
       toast.error("Something went wrong")
    }
  }, [response]);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  //Assign the data to a variable
  defaultValues = spotContentData;

  const onSubmit = (data: any) => {
    console.log(data);
    updateSpotContent(data);
  };

  return (
    <>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Spot Content'}
        child={'Edit'}
        parentLink={'/dashboard/spot-content/list'}
      />
      <SpotContentForm
        formTitle={'Edit Spot Content'}
        defaultValues={defaultValues.data}
        onFormSubmit={onSubmit}
      />
    </>
  );
};

export default EditSpotContent;
