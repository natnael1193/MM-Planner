import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';

const AdvertByStationAndDaysComponent = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card sx={{ p: 2}}>
            <Typography variant="h5">RBS</Typography>
            <Button variant="contained" sx={{ mt: 3}}>View</Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdvertByStationAndDaysComponent;
