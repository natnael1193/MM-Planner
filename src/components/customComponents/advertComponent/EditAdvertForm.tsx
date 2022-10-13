import { Button, TextField, Typography } from '@mui/material';
import { Card, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditAdvertForm = ({ defaultValues, onFormSubmit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 2 }}>
              <Typography variant="h3">Edit Advert</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField label="Key" {...register('key')} fullWidth />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField label="Name" {...register('name')} fullWidth />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Start Time"
                {...register('startTime')}
                type="datetime-local"
                inputProps={{
                  step: 1,
                }}
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="End Time"
                {...register('endTime')}
                type="datetime-local"
                inputProps={{
                  step: 1,
                }}
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </div>
  );
};

export default EditAdvertForm;
