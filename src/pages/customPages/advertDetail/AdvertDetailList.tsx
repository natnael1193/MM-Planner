import React from 'react';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertDetailListComponent from '../../../components/customComponents/advertDetailComponent/AdvertDetailListComponent';

const AdvertDetailList = () => {
  let advertDetailData: any = [];

  //Get All Advert Details
  const { data, error, isLoading, isSuccess, isFetching } = useAdvertDetailsQuery();
  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertDetailData = data;
  }

  if (error) return <Error />;

  console.log(advertDetailData);
  return (
    <div>
      <AdvertDetailListComponent
        advertDetailData={advertDetailData}
        dataGridTitle={'Advert Detail List'}
      />
    </div>
  );
};

export default AdvertDetailList;
