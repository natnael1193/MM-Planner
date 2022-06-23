import React from 'react';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import SpotListComponent
    from '../../../components/customComponents/spotComponent/SpotListComponent';
import { useSpotsQuery } from 'src/services/SpotApi';

const SpotList = () => {
  let spotData: any = [];

  //Get All Spot Contents
  const { data, error, isLoading, isSuccess, isFetching } = useSpotsQuery();

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    spotData = data;
  }

  if (error) return <Error />;
  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Spot'}
        child={'List'}
        parentLink={'/dashboard/spot/list'}
      />
      <SpotListComponent spotData={spotData} dataGridTitle={'Spot List'} />
    </div>
  );
};

export default SpotList;
