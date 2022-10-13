import React from 'react';
import AdvertPlanListComponent from 'src/components/customComponents/advertPlanComponent/AdvertPlanListComponent';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AdvertPlanList = () => {
  let advertPlanData: any = [];

  //get all advert plans
  const { data, error, isLoading, isSuccess } = useAdvertPlansQuery();

  if (isLoading) return <Loading />;

  if (isSuccess) {
    advertPlanData = data;
  }

  if (error) return <Error />;

  console.log(data);

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert Plan'}
        child={'List'}
        parentLink={'/dashboard/advert-plan/list'}
      />
      <AdvertPlanListComponent
        advertPlanData={advertPlanData.data}
        dataGridTitle={'Advert Plan List'}
      />
    </div>
  );
};

export default AdvertPlanList;
