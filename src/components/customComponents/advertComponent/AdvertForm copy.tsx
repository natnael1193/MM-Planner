import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import ExternalProgram from './ExternalProgram';

const AdvertForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  let advertDetailsData: any = [];
  const [advertDetailsId, setAdvertDetailsId] = React.useState('');

  //Get All Advert Details
  const { data: advertDetails, isLoading, isFetching, isSuccess, error } = useAdvertDetailsQuery();

  //React-hook-form
  const { register, handleSubmit, control } = useForm({
    defaultValues,
  });

  //Advert Detail Select Change
  const advertDetailHandleChange = (event: SelectChangeEvent<typeof advertDetailsId>) => {
    setAdvertDetailsId(event.target.value as string);
  };

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    advertDetailsData = advertDetails;
  }

  if (error) return <Error />;

  console.log(defaultValues.advertDetailId);

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
                <TextField {...register('name')} label="Name" fullWidth />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('advertType')} label="Advert Type" fullWidth />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    render={({ field }) => (
                      <div>
                        <InputLabel id="demo-simple-select-label">Advert Details</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Advert Details"
                          {...field}
                          fullWidth
                        >
                          {advertDetailsData?.map((advertDetail: any) => {
                            return (
                              <MenuItem key={advertDetail.id} value={advertDetail.id}>
                                {advertDetail.quantity}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    )}
                    control={control}
                    name="advertDetailId"
                    defaultValue={
                      defaultValues.advertDetailId !== undefined
                        ? defaultValues.advertDetailId
                        : advertDetailsId
                    }
                  />
                </FormControl>
              </Grid>
              <ExternalProgram />
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 3 }}>
                <Button variant="contained" type="submit">
                  {' '}
                  Submit{' '}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default AdvertForm;
