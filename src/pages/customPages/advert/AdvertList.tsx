import React, {useState} from 'react'
import { useAdvertsQuery } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertListComponent from '../../../components/customComponents/advertComponent/AdvertListComponent';

const AdvertList = () => {
  let advertData: any = [];
  const [page, setPage]: any = useState(1);

  //Ger All Advert 
  const { data, error, isLoading, isSuccess, isFetching } = useAdvertsQuery(page);

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertData = data;
  }

  if (error) return <Error />;

  return (
    <div><AdvertListComponent advertData={advertData.data} dataGridTitle={"Advert List"} page={page} setPage={setPage}/></div>
  )
}

export default AdvertList