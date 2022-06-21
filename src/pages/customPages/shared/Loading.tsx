import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div>
      {' '}
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    </div>
  );
};

export default Loading;
