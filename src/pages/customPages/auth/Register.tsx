import React from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useRegisterMutation } from 'src/services/RegisterApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [registerUser, result]: any = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  //Check the stauts
  const response: any = result;
  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success('Registered Successfully!');
      window.location.reload();
      reset();
    }
    if (response.isError) {
      toast.error('Error, Something went wrong!');
    }
  }, [response]);

  const onSubmit = (data: any) => {
    console.log(data);
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Register
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
            <TextField fullWidth label="Last Name" {...register('lastName', { required: true })} />
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
            <TextField fullWidth label="User Name" {...register('userName', { required: true })} />
            <Typography variant="inherit" color="error">
              {errors.userName && 'This is required'}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="password"
              fullWidth
              label="Password"
              {...register('password', { required: true })}
            />
            <Typography variant="inherit" color="error">
              {errors.password && 'This is required'}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="password"
              fullWidth
              label="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
            <Typography variant="inherit" color="error">
              {errors.confirmPassword && 'This is required'}
            </Typography>
            {watch('confirmPassword') !== watch('password') && getValues('confirmPassword') ? (
              <Typography variant="inherit" color="error">
                Password don't match{' '}
              </Typography>
            ) : null}
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant="contained"
              type="submit"
              disabled={watch('confirmPassword') !== watch('password') ? true : false}
            >
              {response.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default Register;
