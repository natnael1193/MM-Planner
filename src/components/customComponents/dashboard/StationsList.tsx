import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';

const StationsList = ({ stationsData, stationsLoading, stationsError }: any) => {
  if (stationsLoading) return <Loading />;
  if (stationsError) return <Error />;
  return stationsData?.data?.map((stations: any) => {
    return (
      <Grid item lg={3} md={4} sm={12} xs={12} key={stations.id}>
        <Link to="" style={{ textDecoration: 'none' }}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h5">{stations.name}</Typography>
          </Card>
        </Link>
      </Grid>
    );
  });
};

export default StationsList;
