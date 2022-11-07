import { Card, Collapse, Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import AdsBySatationAndDays from './AdsByStationAndDays';

const AdvertByStationAndDaysDetailComponent = () => {
  const [showAds, setShowAds] = React.useState(false);
  const showAdsHandleChange = () => {
    showAds === false ? setShowAds(true) : setShowAds(false);
  };
  return (
    <Grid item lg={6} md={12} sm={12} xs={12}>
      <Card sx={{ p: 5 }}>
        <Grid container>
          <Grid item lg={2} md={2} sm={3} xs={3}>
            <Switch onClick={showAdsHandleChange} />
          </Grid>
          <Grid item lg={10} md={10} sm={9} xs={9}>
            <Typography variant="h4">Fana 90</Typography>
            <Typography variant="h5">08:00 AM - 09:00 Am</Typography>
          </Grid>
        </Grid>

        <Collapse in={showAds}>
          <AdsBySatationAndDays />
        </Collapse>
      </Card>
    </Grid>
  );
};

export default AdvertByStationAndDaysDetailComponent;
