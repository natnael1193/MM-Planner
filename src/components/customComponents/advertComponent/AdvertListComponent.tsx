import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDeleteAdvertMutation } from 'src/services/AdvertApi';

const AdvertListComponent = ({ advertData, dataGridTitle }: any) => {
  //Delete Spot
  const [deleteAdvert] = useDeleteAdvertMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Advert Name',
      width: 200,
    },
    // {
    //   field: 'advertPlanId',
    //   headerName: 'Advert Plan',
    //   width: 200,
    // },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 350,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 350,
    },
    {
      field: '',
      // headerName: '',
      type: '',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/advert/detail/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <PreviewIcon />
            </Button>
          </Link>
          <Link to={`/dashboard/advert/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteAdvert(cellValues.id)}>
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
          rows={advertData}
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

export default AdvertListComponent;
