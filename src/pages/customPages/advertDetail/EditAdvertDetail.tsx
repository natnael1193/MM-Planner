import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdvertDetailQuery, useUpdateAdvertDetailMutation } from 'src/services/AdvertDetailApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import AdvertDetailForm from '../../../components/customComponents/advertDetailComponent/AdvertDetailForm';

const EditAdvertDetail = () => {
  const params = useParams();
  const paramsId: any = params.advertDetailId;
  var defaultValues: any = {};

  //Get Advert Detail By Id
  const { data: advertDetailData, error, isLoading } = useAdvertDetailQuery(paramsId);

  //Update the data
  const [updateAdvertDetail, result] = useUpdateAdvertDetailMutation();

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

  defaultValues = advertDetailData;
  const onSubmit = (data: any) => {
    console.log(data);
    updateAdvertDetail(data);
  };

  return (
    <div>
      <AdvertDetailForm
        formTitle={'Edit Advert Detail'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default EditAdvertDetail;
