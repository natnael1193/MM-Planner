import React from 'react';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';

const AdvertPlanDetailListComponent = ({ advertPlanDetailData }: any) => {
  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Key',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 300,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/advert/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error">
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  // Reassign Advert Detail Plan Data
  let newAdvertPlanDetailData: any = [];

  newAdvertPlanDetailData = advertPlanDetailData.map(function (advertPlanDetail: any) {
    return {
      id: advertPlanDetail.id,
      key: advertPlanDetail.key,
      name: advertPlanDetail.name,  
      startTime: moment.utc(advertPlanDetail.startTime).format('dddd Do, MMMM, YYYY/ hh:mm a'),
      endTime: moment.utc(advertPlanDetail.endTime).format('dddd Do, MMMM, YYYY/ hh:mm a'),
      // startTime: advertPlanDetail.startTime,
      // endTime: advertPlanDetail.endTime,
    };
  });


  console.log(advertPlanDetailData)
  console.log(newAdvertPlanDetailData)

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3, mt: -3 }}>
        {/* {dataGridTitle} */}
      </Typography>
      <div style={{ height: '450px', width: '100%' }}>
        <DataGrid
          rows={newAdvertPlanDetailData}
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
          style={{ height: '90vh' }}
        />
      </div>
    </div>
  );
};

export default AdvertPlanDetailListComponent;
