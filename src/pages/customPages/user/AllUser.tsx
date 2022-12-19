import React from 'react';
import { useAllUsersQuery, useDeleteUserMutation } from 'src/services/UserApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { Button, Grid, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';

const AllUser = () => {
  const { data, isLoading, isFetching, isError }: any = useAllUsersQuery();
  let response: any = '';

  const [deleteUser, result] = useDeleteUserMutation();

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 200,
    },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 200,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          {/* <Link to={`/dashboard/spot/detail/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <PreviewIcon />
            </Button>
          </Link> */}
          <Link to={`/dashboard/account/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteUser(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3 }}>
        User List
      </Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          style={{ height: '80vh' }}
        />
      </div>
    </div>
  );
};

export default AllUser;
