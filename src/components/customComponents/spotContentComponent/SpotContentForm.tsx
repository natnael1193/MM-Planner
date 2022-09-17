import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSpotsQuery } from 'src/services/SpotApi';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';

const SpotContentForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  const [spotContent, setSpotContent] = React.useState('');
  let spotContentData: any = [];

  const handleChange = (event: SelectChangeEvent) => {
    setSpotContent(event.target.value);
  };

  //Spot Content Data
  const { data, isLoading, error, isSuccess } = useSpotsQuery();

  //React-Hook-Form
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (isLoading) return <Loading />;

  if (isSuccess) {
    spotContentData = data;
  }

  if (error) return <Error />;

  console.log(defaultValues);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField fullWidth label="Name" {...register('name')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField fullWidth label="Content URL" {...register('contentUrl')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-helper-label">Spot</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    {...register('spotID')}
                    // value={campaignContent}
                    label="Spot"
                    onChange={handleChange}
                    defaultValue={defaultValues.spotID !== undefined ? defaultValues.spotID : ''}
                  >
                    {spotContentData.map((spot: any) => {
                      return (
                        <MenuItem key={spot.id} value={spot.id}>
                          {spot.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button variant="contained" type="submit" color="primary" sx={{ ml: 2 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default SpotContentForm;
