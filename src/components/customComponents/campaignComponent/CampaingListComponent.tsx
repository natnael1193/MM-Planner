import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCampaignMutation } from 'src/services/CamapignApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CampaingListComponent = ({ campaignData, dataGridTitle }: any) => {
  //Delete Campaign
  const [deleteCampaign] = useDeleteCampaignMutation();

  //Data Grid Header
  const columns: GridColumns = [
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
      width: 150,
      renderCell: (cellValues: any) => (
        <>
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


  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {dataGridTitle}
      </Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={campaignData}
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
