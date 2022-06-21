import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteSpotContentMutation } from 'src/services/SpotContentApi';

const SpotContentListComponent = ({ spotContentData, dataGridTitle }: any) => {

  //Delete Spot Content
  const [ deleteSpotContent ] = useDeleteSpotContentMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
        field: 'contentUrl',
        headerName: 'Content URL',
        width: 300,
      },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/spot-content/edit/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteSpotContent(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 3 }}>{dataGridTitle}</Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={spotContentData}
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

export default SpotContentListComponent;
