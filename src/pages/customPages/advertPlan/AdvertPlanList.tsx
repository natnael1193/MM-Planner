import React from 'react'
import AdvertPlanListComponent from 'src/components/customComponents/advertPlanComponent/AdvertPlanListComponent'
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi'
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const AdvertPlanList = () => {
  let advertPlanData: any = []

  //get all advert plans
  const { data, error, isLoading, isSuccess } = useAdvertPlansQuery()

  if (isLoading) return <Loading />;

  if (isSuccess) {
    advertPlanData = data;
  }

  if (error) return <Error />;

  console.log(data)

  return (
    <div><AdvertPlanListComponent advertPlanData={advertPlanData.data} dataGridTitle={"Advert List"} /></div>
  )
}

export default AdvertPlanList