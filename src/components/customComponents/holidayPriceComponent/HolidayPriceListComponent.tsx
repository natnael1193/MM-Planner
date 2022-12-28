import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HolidayPriceListComponent = () => {
  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'station',
      headerName: 'station Name',
      width: 200,
    },
    {
      field: 'campaign',
      headerName: 'Campaign Name',
      width: 200,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 200,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 200,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/spot/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => console.log(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={[]}
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

export default HolidayPriceListComponent;
