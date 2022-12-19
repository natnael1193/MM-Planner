import React from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'src/services/UserApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { toast } from 'react-hot-toast';
import UserForm from '../../../components/customComponents/userComponent/UserForm';

const EditUser = () => {
  const params = useParams();
  const paramsId: any = params.userId;

  const { data, isLoading, isError }: any = useGetUserByIdQuery(paramsId);
  const [updateUser, result]: any = useUpdateUserMutation();

  //Check the stauts
  const response: any = result;
  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success('Updated Successfully!');
      window.location.reload();
      // reset();
    }
    if (response.isError) {
      toast.error('Error, Something went wrong!');
    }
  }, [response]);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (isError) return <Error />;

  const onSubmit = (data: any) => {
    console.log(data);
    updateUser(data);
  };

  console.log(data);

  return <UserForm {...{ defaultValues: data.data, onSubmit, response }} />;
};

export default EditUser;
