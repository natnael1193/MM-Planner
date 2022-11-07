import { Typography, Grid } from '@mui/material';
import React from 'react';
import AdvertByStationAndDaysComponent from 'src/components/customComponents/advertComponent/AdvertByStationAndDaysComponent';
import { useExternalStationsQuery } from 'src/services/ExternalProgramApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const AdvertByStationAndDays = () => {
  let stationDataList: any = [];
  const {
    data: stationData,
    isLoading: stationLoading,
    isFetching: stationFetching,
    isSuccess: stationSuccess,
    error: stationError,
  } = useExternalStationsQuery();

  if (stationLoading || stationFetching) return <Loading />;
  if (stationError) return <Error />;
  if (stationSuccess) {
    stationDataList = stationData;
  }

  console.log(stationData);

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Select Station
      </Typography>
      <Grid container spacing={2}>
        {stationDataList?.data?.map((station: any) => {
          return <AdvertByStationAndDaysComponent key={station.id} station={station} />;
        })}
      </Grid>
    </div>
  );
};

export default AdvertByStationAndDays;
