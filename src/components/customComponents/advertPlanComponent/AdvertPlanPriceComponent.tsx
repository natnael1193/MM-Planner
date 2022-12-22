import { Grid, Typography } from '@mui/material';
import { GridColumns, DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

export const AdvertPlanPriceComponent = ({ totalAdsPrice, stationWithAds }: any) => {
  let newStationWithAds: any = [];
  newStationWithAds = stationWithAds.map(function (station: any, index: any) {
    return {
      index: index + 1,
      id: station.id,
      name: station.name,
      advertPrices: station.advertPrices?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      discountPrice: station.discountPrice + '%',
      advertPriceDiscount: station.advertPriceDiscount?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
      advertPriceAfterDiscount: station.advertPriceAfterDiscount?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
      advertPriceTotal: station.advertPriceTotal?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
    };
  });

  //Data Grid Header
  const columns: any = [
    {
      field: 'index',
      headerName: 'Number',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Station Name',
      width: 200,
    },
    {
      field: 'advertPrices',
      headerName: 'Price Before Vat',
      width: 200,
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price %',
      width: 200,
    },
    {
      field: 'advertPriceDiscount',
      headerName: 'Discount',
      width: 200,
    },
    {
      field: 'advertPriceAfterDiscount',
      headerName: 'Price After Discount',
      width: 200,
    },
    {
      field: 'advertPriceAfterDiscountVat',
      headerName: 'Vat',
      width: 200,
    },
    {
      field: 'advertPriceTotal',
      headerName: 'Sum',
      width: 200,
    },
  ];
  return (
    <div style={{ marginTop: 3 }}>
      <Typography variant="h3"> Prices</Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={newStationWithAds}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          style={{ height: '80vh' }}
        />
      </div>
      <Grid container sx={{ ml: 3, mb: 3 }}>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Typography variant="h3">Total Price:</Typography>
        </Grid>
        <Grid item lg={1} md={3} sm={6} xs={6}>
          <Typography variant="h3" align="right">
            {totalAdsPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
