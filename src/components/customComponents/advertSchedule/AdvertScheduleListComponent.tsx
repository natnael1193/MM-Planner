import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteAdvertScheduleMutation } from 'src/services/AdvertSchduleApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdvertScheduleListComponent = ({ advertScheduleData, dataGridTitle }: any) => {
  //Delete Campaign
  const [deleteAdvertSchedules] = useDeleteAdvertScheduleMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'memberName',
      headerName: 'Member Name',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: '',
      width: 150,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/advert-schedule/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteAdvertSchedules(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {dataGridTitle}
      </Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={advertScheduleData}
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

export default AdvertScheduleListComponent;
