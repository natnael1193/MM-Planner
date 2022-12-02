import { Button, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';

import { useDeleteAdvertPlanMutation } from 'src/services/AdvertPlanApi';

import { useDeleteAdvertMutation } from '../../../services/AdvertApi';
import { AnyAction } from '@reduxjs/toolkit';

const AdvertPlanListComponent = ({ advertPlanData, dataGridTitle, refetch }: any) => {
  let advertPlansData: any = [];
  const totalPriceInitialValue = 0;
  //Delete Spot
  const [deleteAdvert, result] = useDeleteAdvertMutation();

  const removeAdvert = (id: any) => {
    deleteAdvert(id);
    setTimeout(() => {
      refetch();
    });
  };

  function add(accumulator: any, a: any) {
    return accumulator + a;
  }

  console.log(advertPlansData);

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
      field: 'contentLength',
      headerName: 'Content Length',
      width: 200,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 200,
    },

    {
      field: 'totalContentLength',
      headerName: 'Total Content Length',
      width: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
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
          <Link to={`/dashboard/advert/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
            onClick={() => {
              removeAdvert(cellValues.id);
            }}
          >
            {result.isLoading ? <CircularProgress /> : <DeleteIcon />}
          </Button>
        </>
      ),
    },
  ];
  console.log('advertPlanData', advertPlanData);
  advertPlansData = advertPlanData?.map(function (advertPlans: any) {
    return {
      id: advertPlans?.id,
      month: moment.utc(advertPlans?.startTime).format('MMMM'),
      date: moment.utc(advertPlans?.startTime).format('DD'),
      day: moment.utc(advertPlans?.startTime).format('dddd'),
      dates: moment.utc(advertPlans.startTime).unix(),
      // date: advertPlans?.startTime,
      // day: advertPlans?.startTime,
      startTime: moment.utc(advertPlans?.schedule?.startTime).format('hh:mm A'),
      endTime: moment.utc(advertPlans?.schedule?.endTime).format('hh:mm A'),
      program: advertPlans?.schedule.program.name,
      advertType: advertPlans?.schedule?.priceConfig?.priceCategory?.priceType,
      priceConfig: advertPlans?.schedule?.priceConfig.name,
      priceConfigRate: advertPlans?.schedule?.priceConfig.rate,
      priceConfigUnit: advertPlans?.schedule?.priceConfig.unit,
      // advertType: advertPlans?.advertType,
      priceType: advertPlans?.priceType,
      price: advertPlans?.price,
      ad: advertPlans?.ads?.name,
      contentLength: advertPlans?.adverts?.map(function (advert: any) {
        return advert.ads.contentLength;
      }),
      quantity: advertPlans?.adverts?.map(function (advert: any) {
        return advert.qut;
      }),
      sponsoredLength: advertPlans?.sponsoredLength,
      sponsorshipPrice: advertPlans?.sponsorshipPrice,
      totalPrice: advertPlans?.adverts?.map(function (advert: any) {
        return (
          advert.qut *
          advert?.ads.contentLength *
          (advertPlans?.schedule?.priceConfig.rate / advertPlans?.schedule?.priceConfig.unit)
        );
      }),
    };
  });
  console.log('result', advertPlansData);

  advertPlansData = advertPlansData?.map(function (advertPlans: any) {
    return {
      id: advertPlans?.id,
      month: advertPlans?.month,
      day: advertPlans?.day,
      date: advertPlans?.date,
      dates: advertPlans?.dates,
      startTime: advertPlans?.startTime,
      endTime: advertPlans?.endTime,
      program: advertPlans?.program,
      priceType: advertPlans?.priceType,
      priceConfig: advertPlans?.priceConfig,
      priceConfigRate: advertPlans?.priceConfigRate,
      priceConfigUnit: advertPlans?.priceConfigUnit,
      price: advertPlans?.price,
      advertType: advertPlans?.advertType,
      ad: advertPlans?.ad,
      contentLength: advertPlans?.contentLength,
      quantity: advertPlans?.quantity,
      totalContentLength:
        advertPlans?.advertType === 'Spot'
          ? advertPlans?.contentLength.reduce(add, 0)
          : advertPlans?.contentLength,
      totalAdvertQuantity: advertPlans?.totalAdvertQuantity,
      totalPrice:
        advertPlans?.priceType === 'Spot'
          ? advertPlans?.totalPrice
              .reduce(add, 0)
              .toLocaleString(undefined, { maximumFractionDigits: 2 })
          : // (advertPlans?.priceConfigRate  * advertPlans?.sponsoredLength / advertPlans?.priceConfigUnit )
            advertPlans?.price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    };
  });

  advertPlansData = advertPlansData.sort(
    (firstItem: any, secondItem: any) => firstItem.dates - secondItem.dates
  );
  console.log('result', advertPlansData);

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 1 }}>
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
