import React from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const UserForm = ({ defaultValues, onSubmit, response }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Update User 
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName', { required: true })}
              />
              <Typography variant="inherit" color="error">
                {errors.firstName && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { required: true })}
              />
              <Typography variant="inherit" color="error">
                {errors.lastName && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField fullWidth label="Email" {...register('email', { required: true })} />
              <Typography variant="inherit" color="error">
                {errors.email && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="User Name"
                {...register('userName', { required: true })}
              />
              <Typography variant="inherit" color="error">
                {errors.userName && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button variant="contained" type="submit">
                {response.isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </div>
  )
};

export default UserForm;
