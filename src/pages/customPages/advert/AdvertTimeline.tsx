import React from 'react';
import { useAdvertsQuery } from 'src/services/AdvertApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import TimelineComponent from '../../../components/customComponents/timeline/TimelineComponent';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AdvertTimeline = () => {
  let advertData: any = [];
  let advertPlanData: any = [];

  //Get All Advert
  const { data, error, isLoading, isSuccess, isFetching } = useAdvertsQuery();

  //Get All Advert Plan
  const {
    data: advertPlanDatas,
    error: advertPlanError,
    isLoading: advertPlanLoading,
    isSuccess: advertPlanSuccess,
    isFetching: advertPlanFetching,
  } = useAdvertPlansQuery();

  if (isLoading || isFetching || advertPlanLoading || advertPlanFetching) return <Loading />;

  if (isSuccess) {
    advertData = data;
  }

  if (advertPlanSuccess) {
    advertPlanData = advertPlanDatas;
  }

  if (error || advertPlanError) return <Error />;

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Advert'}
        child={'Timeline'}
        parentLink={'/dashboard/advert/list'}
      />
      <TimelineComponent advertData={advertData.data} advertPlanData={advertPlanData.data} />
    </div>
  );
};

export default AdvertTimeline;
