import React from 'react';
import { useAdvertSchedulesQuery } from 'src/services/AdvertSchduleApi';
import AdvertScheduleListComponent from '../../../components/customComponents/advertSchedule/AdvertScheduleListComponent';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const AdvertScheduleList = () => {
  let advertScheduleData: any = [];
  
  
  // Get all advert schdedules
const { data, error, isLoading, isSuccess } = useAdvertSchedulesQuery()

if (isLoading) return <Loading />;
if (isSuccess) {
  advertScheduleData = data;
}
if (error) return <Error />;

  return (
    <div>
      <AdvertScheduleListComponent advertScheduleData={advertScheduleData.data} dataGridTitle={"Advert Schedules List"}/>
    </div>
  );
};

export default AdvertScheduleList;
