import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAdvertDetailMutation } from 'src/services/AdvertDetailApi';
import AdvertDetailForm from '../../../components/customComponents/advertDetailComponent/AdvertDetailForm';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddAdvertDetail = () => {
  const navigate = useNavigate();

  //Initial Values Of Spot
  const initialValues = {
    quantity: '',
    key: '',
    spotId: '',
    advertId: '',
  };

  //Add New Data
  const [addAdvertDetail, result] = useAddAdvertDetailMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/advert-detail/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    addAdvertDetail(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Detail'}
        child={'Add'}
        parentLink={'/dashboard/advert-detail/list'}
      />
      <AdvertDetailForm
        formTitle={'Add Advert Detail'}
        defaultValues={initialValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddAdvertDetail;
