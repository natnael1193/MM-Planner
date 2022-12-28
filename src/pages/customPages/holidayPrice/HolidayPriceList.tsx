import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import HolidayPriceListComponent from 'src/components/customComponents/holidayPriceComponent/HolidayPriceListComponent';

const HolidayPriceList = () => {
  const columns: any = [];
  const row: any = [];
  return (
    <div>
      <Grid container sx={{ p: 3 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">Holiday Prices</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <HolidayPriceListComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default HolidayPriceList;
