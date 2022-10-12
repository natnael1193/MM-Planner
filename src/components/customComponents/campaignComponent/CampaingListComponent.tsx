import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCampaignMutation } from 'src/services/CamapignApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import moment from 'moment';

const CampaingListComponent = ({ campaignData, dataGridTitle }: any) => {
  var newCampaignData: any = [];
  //Delete Campaign
  const [deleteCampaign] = useDeleteCampaignMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Key',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Campaign Name',
      width: 300,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 300,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: '',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/campaign/detail/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <PreviewIcon />
            </Button>
          </Link>
          <Link to={`/dashboard/campaign/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteCampaign(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  newCampaignData = campaignData.map(function (campaing: any) {
    return {
      id: campaing.id,
      key: campaing.key,
      name: campaing.name,
      startDate: moment.utc(campaing.startDate).format('dddd Do MMMM YYYY'),
      endDate: moment.utc(campaing.endDate).format('dddd Do MMMM YYYY'),
    };
  });

  console.log(newCampaignData);

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {dataGridTitle}
      </Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={newCampaignData}
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

export default CampaingListComponent;
