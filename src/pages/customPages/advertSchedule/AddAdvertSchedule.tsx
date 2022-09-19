import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertScheduleForm from 'src/components/customComponents/advertSchedule/AdvertScheduleForm';
import BreadCrumb from 'src/pages/customPages/breadCrumb/BreadCrumb';
import { useAddAdvertScheduleMutation } from 'src/services/AdvertSchduleApi';

const AddAdvertSchedule = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  // Initial State
  const initialValues: any = {
    memberName: '',
  };

  const navigate = useNavigate();

  //Add New Data
  const [addAdvertSchedule, result] = useAddAdvertScheduleMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      navigate('/dashboard/advert-schedule/list');
    }
    if (response.isError) {
      console.log(response);
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    addAdvertSchedule(data);
  };

  return <div>
          <BreadCrumb
        main={'Dashboard'}
        parent={'Campaign'}
        child={'Add'}
        parentLink={'/dashboard/campaign/list'}
      />
      <AdvertScheduleForm formTitle={'Add Advert Schedule'} defaultValues={initialValues} onFormSubmit={onSubmit} />
  </div>;
};

export default AddAdvertSchedule;
