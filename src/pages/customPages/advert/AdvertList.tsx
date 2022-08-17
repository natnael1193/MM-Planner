import React from 'react'
import { useAdvertsQuery } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertListComponent from '../../../components/customComponents/advertComponent/AdvertListComponent';

const AdvertList = () => {
  let advertData: any = [];

  //Ger All Advert 
  const { data, error, isLoading, isSuccess, isFetching } = useAdvertsQuery();

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertData = data;
  }

  if (error) return <Error />;

  return (
    <div><AdvertListComponent advertData={advertData} dataGridTitle={"Advert List"}/></div>
  )
}

export default AdvertList