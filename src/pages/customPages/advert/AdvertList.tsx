import React, { useState } from 'react';
import { useAdvertsQuery } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import AdvertListComponent from '../../../components/customComponents/advertComponent/AdvertListComponent';
import moment from 'moment';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AdvertList = () => {
  let advertData: any = [];
  const [page, setPage]: any = useState(1);

  //Ger All Advert
  const { data, error, isLoading, isSuccess, isFetching }: any = useAdvertsQuery(page);

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertData = data.data?.map(function (adverts: any) {
      return {
        id: adverts.id,
        key: adverts.ads.key,
        name: adverts.ads.name,
        startTime: moment.utc(adverts.schedule.startTime).format(' dddd Do, MMMM YYYY, h:mm:ss a'),
        endTime: moment.utc(adverts.schedule.endTime).format(' dddd Do, MMMM YYYY, h:mm:ss a'),
        advertPlanId: adverts.advertPlanId,
      };
    });

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

  console.log(data)

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'List'}
        parentLink={'/dashboard/advert/list'}
      />
      <AdvertListComponent
        advertData={advertData}
        dataGridTitle={'Advert List'}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdvertList;
