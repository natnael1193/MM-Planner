import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDeleteSpotMutation } from 'src/services/SpotApi';

const SpotListComponent = ({ spotData, dataGridTitle }: any) => {
  //Delete Spot
  const [deleteSpot] = useDeleteSpotMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Alias',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Ads Name',
      width: 300,
    },
    // {
    //   field: 'contentType',
    //   headerName: 'Content Type',
    //   width: 300,
    // },
    {
      field: 'contentLength',
      headerName: 'Content Length',
      width: 300,
    },
    // {
    //     field: 'spotContentIds',
    //     headerName: 'Spot Contents',
    //     width: 300,
    //   },
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
          <Link to={`/dashboard/spot/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteSpot(cellValues.id)}>
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
          rows={spotData}
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

export default SpotListComponent;
