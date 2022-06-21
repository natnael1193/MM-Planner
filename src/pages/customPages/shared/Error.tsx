import { Grid, Typography } from '@mui/material';
import React from 'react';

const Error = () => {
  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    </div>
  );
};

export default Error;
