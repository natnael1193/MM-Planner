import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';

const EditAdvertPrice = () => {
  return (
    <Grid container sx={{ p: 3}}>
      <Grid item lg={3} md={4} sm={12} xs={12}>
        <Typography variant="h4">Monday</Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={Price Config}
            label="Price Config"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default EditAdvertPrice;
