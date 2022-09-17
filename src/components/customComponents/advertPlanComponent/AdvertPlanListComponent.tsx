import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteAdvertPlanMutation } from 'src/services/AdvertPlanApi';

const AdvertPlanListComponent = ({ advertPlanData, dataGridTitle }: any) => {
  //Delete Spot
  const [deleteAdvertPlan] = useDeleteAdvertPlanMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Advert Plan Name',
      width: 300,
    },
    {
      field: 'campaignId',
      headerName: 'Campaign',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: '',
      width: 150,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/advert-plan/edit/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteAdvertPlan(cellValues.id)}>
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
          rows={advertPlanData}
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

export default AdvertPlanListComponent;
