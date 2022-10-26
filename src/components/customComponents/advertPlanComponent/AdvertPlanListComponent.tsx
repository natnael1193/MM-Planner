import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDeleteAdvertPlanMutation } from 'src/services/AdvertPlanApi';
import moment from 'moment'

const AdvertPlanListComponent = ({ advertPlanData, dataGridTitle }: any) => {
  let advertPlansData: any = [];
  //Delete Spot
  const [deleteAdvertPlan] = useDeleteAdvertPlanMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'month',
      headerName: 'Month',
      width: 200,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
    },
    {
      field: 'day',
      headerName: 'Day',
      width: 200,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 200,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 200,
    },
    {
      field: 'program',
      headerName: 'Program',
      width: 200,
    },
    {
      field: 'advertType',
      headerName: 'AdvertType',
      width: 200,
    },
    {
      field: 'ad',
      headerName: 'Ad',
      width: 200,
    },
    {
      field: 'contentLength',
      headerName: 'Content Length',
      width: 200,
    },
    {
      field: 'quantity',
      headerName: 'Spot Quantity',
      width: 200,
    },
    {
      field: 'priceConfigRate',
      headerName: 'Price Per Second',
      width: 200,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
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
            to={`/dashboard/advert-plan/detail/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <PreviewIcon />
            </Button>
          </Link>
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

advertPlansData = advertPlanData.map(function(advertPlans: any){
  return{
    id: advertPlans.id,
    month: moment.utc(advertPlans.schedule.startTime).format('MMMM'),
    date: moment.utc(advertPlans.schedule.startTime).format('DD'),
    day: moment.utc(advertPlans.schedule.startTime).format('dddd'),
    startTime: moment.utc(advertPlans.schedule.startTime).format('hh:mm:ss A'),
    endTime: moment.utc(advertPlans.schedule.endTime).format('hh:mm:ss A'),
    program: advertPlans.schedule.program.name,
    priceClasifcation: advertPlans.schedule.priceClasifcation.name,
    priceCategory: advertPlans.schedule.priceClasifcation.priceCategory.name,
    priceConfig: advertPlans.schedule.priceClasifcation.priceConfig.name,
    priceConfigRate: advertPlans.schedule.priceClasifcation.priceConfig.rate,
    priceConfigUnit: advertPlans.schedule.priceClasifcation.priceConfig.unit,
    advertType: advertPlans.advertType,
    ad: advertPlans.ads.name,
    contentLength: advertPlans.ads.contentLength,
    quantity: advertPlans.qut,
    totalPrice: advertPlans.advertType === "Spot"
    ?
      advertPlans.schedule.priceClasifcation.priceConfig.rate * advertPlans.qut * advertPlans.ads.contentLength
      :
      advertPlans.schedule.priceClasifcation.priceConfig.rate * advertPlans.ads.contentLength

  }
})


console.log(advertPlansData)

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 1, }}>
        {dataGridTitle}
      </Typography>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={advertPlansData}
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
