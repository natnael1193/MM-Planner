import React, { useState } from 'react';
import { useAdvertsQuery } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertListComponent from '../../../components/customComponents/advertComponent/AdvertListComponent';
import moment from 'moment';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import AdvertPlanListComponent from 'src/components/customComponents/advertPlanComponent/AdvertPlanListComponent';

const AdvertList = () => {
  let advertData: any = [];
  const [page, setPage]: any = useState(1);

  //Ger All Advert
  const { data, error, isLoading, isSuccess, isFetching, refetch }: any = useAdvertsQuery(page);

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertData = data.data;

    //   {
    //     "id": "b15ac2cc-1344-4b53-8cd4-48e785bba112",
    //     "key": "Quis consectetur om",
    //     "name": "Arsenio Hale",
    //     "startTime": "2022-10-14T11:38Z",
    //     "endTime": "2022-10-14T00:39Z",
    //     "advertPlanId": "2f2aab3a-c18d-4425-8ef3-4c8e02f3bc61",
    // }
  }

  if (error) return <Error />;

  // console.log(advertData);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'List'}
        parentLink={'/dashboard/advert/list'}
      />
      <AdvertPlanListComponent
        advertPlanData={advertData}
        dataGridTitle={'Advert List'}
        page={page}
        setPage={setPage}
        refetch={refetch}
      />
    </div>
  );
};

export default AdvertList;
