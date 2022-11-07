import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AdvertByStationAndDaysComponent = ({ station }: any) => {
  return (
    <Grid item lg={4} md={6} sm={12} xs={12}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h5">{station.name}</Typography>
        <Link to="/dashboard/advert/advert-by-station-days-detail" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ mt: 3 }} color="info">
            View
          </Button>
        </Link>
      </Card>
    </Grid>
  );
};

export default AdvertByStationAndDaysComponent;
