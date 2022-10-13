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
  const { data: advertDetailData, error, isLoading }: any = useAdvertDetailQuery(paramsId);

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

  defaultValues = {
    id: advertDetailData.data.id,
    key: advertDetailData.data.key,
    quantity: advertDetailData.data.quantity,
    advertId: advertDetailData.data.advert.id,
    spotId: advertDetailData.data.spot.id,
    advertPlanId: advertDetailData.data.advert.advertPlanId,
  };

  const onSubmit = (data: any) => {
    updateAdvertDetail(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Detail'}
        child={'Edit'}
        parentLink={'/dashboard/advert-detail/list'}
      />
      <AdvertDetailForm
        formTitle={'Edit Advert Detail'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default EditAdvertDetail;
