import React, { useEffect } from 'react';
import { Container, Grid, Typography, Card, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'src/services/LoginApi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
      navigate('/login');
      toast.error('Invalid Credentials')
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
        backgroundColor: '#ffeee0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container direction="row" justifyContent="center" alignItems="center" lg={6} sm={12}>
        <Card sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" sx={{ width: '100%', p: 5 }} spacing={3}>
              <Grid item>
                <Typography variant="h4">Login</Typography>
              </Grid>
              <Grid item>
                <TextField label="Email" {...register('email')} fullWidth />
              </Grid>
              <Grid item>
                <TextField label="Password" {...register('password')} fullWidth />
              </Grid>
              <Grid item>
                <Button type="submit" variant='contained'>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default Login;
