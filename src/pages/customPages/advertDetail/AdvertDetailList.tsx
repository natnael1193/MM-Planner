import React from 'react';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertDetailListComponent from '../../../components/customComponents/advertDetailComponent/AdvertDetailListComponent';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AdvertDetailList = () => {
  let advertDetailData: any = [];

  //Get All Advert Details
  const { data, error, isLoading, isSuccess, isFetching }: any = useAdvertDetailsQuery();
  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertDetailData = data;
  }

  if (error) return <Error />;

  advertDetailData = data.data?.map(function (advertDetail: any) {
    return {
      id: advertDetail.id,
      spotId: advertDetail.spot.name,
      advertId: advertDetail.advert.name,
      quantity: advertDetail.quantity,
    };
  });

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Detail'}
        child={'list'}
        parentLink={'/dashboard/advert-detail/list'}
      />
      <AdvertDetailListComponent
        advertDetailData={advertDetailData}
        dataGridTitle={'Advert Detail List'}
      />
    </div>
  );
};

export default AdvertDetailList;
