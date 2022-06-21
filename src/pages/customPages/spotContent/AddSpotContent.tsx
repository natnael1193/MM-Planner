import SpotContentForm from '../../../components/customComponents/spotContentComponent/SpotContentForm';
import { useNavigate } from 'react-router-dom';
import { useAddSpotContentMutation } from 'src/services/SpotContentApi';
import { useEffect } from 'react';
import BreadCrumb from '../breadCrumb/BreadCrumb';
// import { toast } from 'react-toastify';

const AddSpotContent = () => {
  const navigate = useNavigate();

  //Initial Values Of Spot Content
  const InitialValues = {
    name: '',
    contentUrl: '',
  };

  //Add New Data
  const [addSpotContent, result] = useAddSpotContentMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      // toast.success('Success');
      console.log(response)
      navigate('/dashboard/spot-content/list');
    }
    if (response.isError) {
      console.log(response)
      // toast.error(response.error.data.error);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    console.log(data);
    addSpotContent(data);
  };

  return (
    <div>
            <BreadCrumb
        main={'Dashboard'}
        parent={'Spot Content'}
        child={'Add'}
        parentLink={'/dashboard/spot-content/list'}
      />
      <SpotContentForm
        formTitle={'Add Spot Content'}
        defaultValues={InitialValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddSpotContent;
