import React, { useEffect } from 'react';
import { Container, Grid, Typography, Card, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'src/services/LoginApi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [login, result] = useLoginMutation();

  //  Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('login_token', JSON.stringify(response.data.data.jwToken));
      navigate('/dashboard');
      window.location.reload();
    }
    if (response.isError) {
      toast.error(response.error.data.Message)
      navigate('/login');
    }
  }, [response, navigate]);

  console.log('result', result);

  const onSubmit = (data: any) => {
    console.log(data);
    login(data);
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container  direction="row" justifyContent="center" alignItems="center">
        <Grid item lg={6} sm={12} xs={12} justifyContent="center" alignItems="center">
          <Typography color="white" variant="h1">
            MM - Planner
          </Typography>
          <Card sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column" sx={{ width: '100%', p: 5 }} spacing={3}>
                <Grid item>
                  <Typography variant="h4">Login</Typography>
                </Grid>
                <Grid item>
                  <TextField label="Email" {...register('email', { required: true })} fullWidth />
                  <Typography variant="inherit" color="error">
                    {errors.email && 'This is required'}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    {...register('password', { required: true })}
                    fullWidth
                  />
                  <Typography variant="inherit" color="error">
                    {errors.password && 'This is required'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
