import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import ProgramsByDays from 'src/components/customComponents/externalPrograms/ProgramsByDays';
import AdvertByStationAndDaysDetailComponent from '../../../components/customComponents/advertComponent/AdvertByStationAndDaysDetailComponent';

const AdvertByStationAndDaysDetail = () => {
  const [activeDate, setActiveDate] = React.useState('');
  return (
    <div>
      <Typography variant="h3">Fana Radio</Typography>
      <ProgramsByDays setActiveDate={setActiveDate} activeDate={activeDate} setIsCheck={[]} />

      <Grid container sx={{ mt: 5 }} spacing={3}>
        <AdvertByStationAndDaysDetailComponent />
        <AdvertByStationAndDaysDetailComponent />
        <AdvertByStationAndDaysDetailComponent />
      </Grid>
    </div>
  );
};

export default AdvertByStationAndDaysDetail;
