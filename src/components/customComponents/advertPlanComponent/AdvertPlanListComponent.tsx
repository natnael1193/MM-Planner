import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridPagination,
  GridSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { useDeleteAdvertMutation } from '../../../services/AdvertApi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useExternalUpdateStationMutation } from 'src/services/ExternalProgramApi';
import { toast } from 'react-hot-toast';
import { TotalSum } from '../advertComponent/TotalSum';

const AdvertPlanListComponent = ({
  advertPlanData,
  dataGridTitle,
  refetch,
  campaignData,
  setCampaignId,
  campaignId,
  stationId,
  stationData,
}: any) => {
  let advertPlansData: any = [];
  const totalPriceInitialValue = 0;

  const [total, setTotal] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let discount: any = 0;
  let beforeVat: any = 0;
  let discountPrice: any = 0;
  let priceAfterDiscount: any = 0;
  let totalPrice = 0;
  // const [campaignId, setCampaignId] = React.useState(campaignData[0]?.id);

  //Delete Spot
  const [deleteAdvert, result] = useDeleteAdvertMutation();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const [discountPriceUpdate, discountPriceResult] = useExternalUpdateStationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const removeAdvert = (id: any) => {
    deleteAdvert(id);
  };

  //Check the status
  const deleteResponse: any = result;
  React.useEffect(() => {
    if (deleteResponse.isSuccess) {
      toast.success('Deleted successfully');
      refetch();
    }
    if (deleteResponse.isError) {
      toast.error(deleteResponse.error.data.error);
    }
  }, [deleteResponse]);

  //Check the status
  const response: any = discountPriceResult;
  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success('Updated Successfully');
      handleClose();
    }
    if (response.isError) {
      toast.error('Something went wrong!');
    }
  }, [response]);

  function add(accumulator: any, a: any) {
    return accumulator + a;
  }

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
      field: 'advertLengthName',
      headerName: 'Advert Length Name',
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
      advertType: advertPlans?.priceType,
      priceConfig: advertPlans?.schedule?.priceConfig.name,
      priceConfigRate: advertPlans?.schedule?.priceConfig.rate,
      priceConfigUnit: advertPlans?.schedule?.priceConfig.unit,
      // advertType: advertPlans?.advertType,
      advertLengthName: advertPlans?.priceConfig?.name,
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
      advertLengthName: advertPlans?.advertLengthName,
      ad: advertPlans?.ad,
      contentLength: advertPlans?.contentLength.reduce(add, 0),
      quantity: advertPlans?.quantity.reduce(add, 0),
      totalContentLength:
        advertPlans?.advertType === 'Spot'
          ? advertPlans?.contentLength.reduce(add, 0)
          : advertPlans?.contentLength.reduce(add, 0),
      totalAdvertQuantity: advertPlans?.totalAdvertQuantity,
      totalPrice:
        advertPlans?.priceType === 'Spot'
          ? advertPlans?.totalPrice
              .reduce(add, 0)
              .toLocaleString(undefined, { maximumFractionDigits: 2 })
          : // (advertPlans?.priceConfigRate  * advertPlans?.sponsoredLength / advertPlans?.priceConfigUnit )
            advertPlans?.price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      prices:
        advertPlans?.priceType === 'Spot'
          ? advertPlans?.totalPrice.reduce(add, 0)
          : // (advertPlans?.priceConfigRate  * advertPlans?.sponsoredLength / advertPlans?.priceConfigUnit )
            advertPlans?.price,
    };
  });

  advertPlansData = advertPlansData.sort(
    (firstItem: any, secondItem: any) => firstItem.dates - secondItem.dates
  );

  const addDiscountPrice = (data: any) => {
    console.log(data);
    const newData: any = {
      id: stationData.id,
      key: stationData.key,
      name: stationData.name,
      description: stationData.description,
      organizationId: stationData.organization?.id,
      discountPrice: data.discountPrice,
    };
    discountPriceUpdate(newData);
  };

  // console.log(campaignData[0]?.id);
  discountPrice =
    window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
      ? (total / ((stationData.discountPrice + 100) / 100)) * 1.15
      : null;

  discount =
    window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
      ? total * (stationData.discountPrice / 100)
      : null;

  priceAfterDiscount =
    window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
      ? total - total * (stationData.discountPrice / 100)
      : null;

  beforeVat =
    window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
      ? priceAfterDiscount * (15 / 100)
      : null;

  totalPrice = priceAfterDiscount + beforeVat;
  // discount = (total / ((stationData.discountPrice + 100) / 100)) * 1.15
  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={9} sm={12} xs={12} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {dataGridTitle}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
            ? 'Discount Price:-' + stationData.discountPrice
            : ''}
        </Typography>
      </Grid>
      {window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}` ? (
        <Grid container spacing={2} sx={{ ml: 1 }}>
          <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Campaigns</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={campaignId}
                label="Campaigns"
                onChange={(e: any) => {
                  setCampaignId(e.target.value);
                }}
                defaultValue={campaignData[0]?.id}
              >
                {campaignData?.map((campaigns: any) => (
                  <MenuItem value={campaigns.id} key={campaigns.id}>
                    {campaigns.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Button variant="contained" onClick={handleOpen}>
              Add Discount Price
            </Button>
          </Grid>
        </Grid>
      ) : null}

      <Grid item lg={3} md={3} sm={12} xs={12}>
        {selectionModel.length > 1 ? (
          <Button variant="contained" sx={{ mt: 1, mb: 1 }} color="error">
            Delete
          </Button>
        ) : (
          ''
        )}
      </Grid>

      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={advertPlansData}
          columns={columns}
          // pagination
          components={{
            Toolbar: GridToolbar,
            Pagination: GridPagination,
            // Footer: TotalSum,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
            // footer: { total },
          }}
          // checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          onStateChange={(state) => {
            console.log(state);
            const visibleRows = state.filter.visibleRowsLookup;
            console.log(visibleRows);
            let visibleItems: any = [];
            for (const [id, value] of Object.entries(visibleRows)) {
              if (value === true) {
                visibleItems?.push(id);
              }
            }
            console.log(visibleItems);
            const res = advertPlansData.filter((item: any) => visibleItems?.includes(item?.id));
            // const total =
            //   res.length> 0
            //     ? res
            //     : advertPlansData
            //         ?.map(function (advertPlans: any) {
            //           return advertPlans.prices;
            //         })
            //         .reduce(add, 0)
            //         ;
            const total = advertPlansData
              ?.map(function (advertPlans: any) {
                return advertPlans.prices;
              })
              .reduce(add, 0);
            console.log(res);
            setTotal(total);
          }}
          style={{ height: '80vh' }}
        />

        {window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}` ? (
          <>
            <Grid container sx={{ ml: 3 }}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography variant="inherit">Total Price Before Discount:</Typography>
              </Grid>
              <Grid item lg={1} md={3} sm={6} xs={6}>
                <Typography variant="inherit" align="right">
                  {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ ml: 3 }}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography variant="inherit">{stationData.discountPrice}% Discount:</Typography>
              </Grid>
              <Grid item lg={1} md={3} sm={6} xs={6}>
                <Typography variant="inherit" align="right">
                  {discount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ ml: 3 }}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography variant="inherit">Price After Discount:</Typography>
              </Grid>
              <Grid item lg={1} md={3} sm={6} xs={6}>
                <Typography variant="inherit" align="right">
                  {priceAfterDiscount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ ml: 3 }}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography variant="inherit">Vat:</Typography>
              </Grid>
              <Grid item lg={1} md={3} sm={6} xs={6}>
                <Typography variant="inherit" align="right">
                  {beforeVat?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ ml: 3 }}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography variant="h5">Total Price:</Typography>
              </Grid>
              <Grid item lg={1} md={3} sm={6} xs={6}>
                <Typography variant="h5" align="right">
                  {totalPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : null}
      </div>

      {window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}` ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Discount Price
            </Typography>
            <form onSubmit={handleSubmit(addDiscountPrice)}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    label="Discount Price"
                    {...register('discountPrice', { required: true })}
                    defaultValue={stationData.discountPrice}
                    fullWidth
                  />
                  <Typography variant="inherit" sx={{ color: 'red' }}>
                    {' '}
                    {errors.discountPrice && 'This is required'}
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      ) : null}
    </Grid>
  );
};

export default AdvertPlanListComponent;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
