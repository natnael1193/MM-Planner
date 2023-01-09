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
  Input,
  Alert,
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
import { useDeleteAdvertMutation, useRecordAdvertsMutation } from '../../../services/AdvertApi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useExternalUpdateStationMutation } from 'src/services/ExternalProgramApi';
import { toast } from 'react-hot-toast';
import { TotalSum } from '../advertComponent/TotalSum';
import { AdvertPlanPriceComponent } from './AdvertPlanPriceComponent';
import Loading from 'src/pages/customPages/shared/Loading';
import { EthDateTime, limits } from 'ethiopian-calendar-date-converter'

const AdvertPlanListComponent = ({
  advertPlanData,
  dataGridTitle,
  refetch,
  campaignData,
  setCampaignId,
  campaignId,
  defaultValueCampaignId,
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
  let repetationSum: any = 0;
  let stationWithAds: any = [];
  let AdsPrice: any = [];
  let totalAdsPrice: any = 0;
  // const [campaignId, setCampaignId] = React.useState(campaignData[0]?.id);

  //Delete Spot
  const [deleteAdvert, result] = useDeleteAdvertMutation();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const [discountPriceUpdate, discountPriceResult] = useExternalUpdateStationMutation();
  const [startRecording, recordingResult] = useRecordAdvertsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const removeAdvert = (id: any) => {
    deleteAdvert(id);
  };

  //Check the status
  const deleteResponse: any = result;
  const recordResponse: any = recordingResult;
  React.useEffect(() => {
    if (deleteResponse.isSuccess) {
      toast.success('Deleted Successfully');
      refetch();
    }
    if (deleteResponse.isError) {
      toast.error(deleteResponse.error.data.error);
    }
  }, [deleteResponse]);

  React.useEffect(() => {
    // if (recordResponse.isLoading) {
    //   toast('Recording, Please Wait');
    // }
    if (recordResponse.isSuccess) {
      toast.success('Recorded Successfully');
      refetch();
    }
    if (recordResponse.isError) {
      toast.error('Something went wrong');
    }
  }, [recordResponse]);

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

  const recordingForm = (data: any) => {
    console.log(data);
    startRecording(data);
  };

  function add(accumulator: any, a: any) {
    return accumulator + a;
  }

  //Data Grid Header
  const columns: GridColumns = [
    // {
    //   field: 'month',
    //   headerName: 'Month',
    //   width: 200,
    // },
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   width: 200,
    // },
    {
      field: 'day',
      headerName: 'Day',
      width: 300,
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
      field: 'reptation',
      headerName: 'Ads Repetation',
      width: 200,
    },
    {
      field: 'recorded',
      headerName: 'Recorded',
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

  // console.log('advertPlansData', advertPlanData);
  advertPlansData = advertPlanData?.map(function (advertPlans: any) {
    return {
      id: advertPlans?.id,
      stationId: advertPlans?.schedule?.program?.stationId,
      day: EthDateTime.fromEuropeanDate(new Date(advertPlans?.startTime)).toDateWithDayString(),
      // month: moment.utc(advertPlans?.startTime).format('MMMM'),
      // date: moment.utc(advertPlans?.startTime).format('DD'),
      // day: moment.utc(advertPlans?.startTime).format('dddd'),
      dates: moment.utc(advertPlans.startTime).unix(),
      // date: advertPlans?.startTime,
      // day: advertPlans?.startTime,
      startTime: moment.utc(advertPlans?.schedule?.startTime).format('hh:mm A'),
      endTime: moment.utc(advertPlans?.schedule?.endTime).format('hh:mm A'),
      program: advertPlans?.schedule.program.name,
      advertType: advertPlans?.priceType,
      priceConfig: advertPlans?.priceConfig.name,
      priceConfigRate: advertPlans?.priceConfig.rate,
      priceConfigUnit: advertPlans?.priceConfig.unit,
      // advertType: advertPlans?.advertType,
      advertLengthName: advertPlans?.priceConfig?.name,
      priceType: advertPlans?.priceType,
      price: advertPlans?.price,
      ad: advertPlans?.ads?.name,
      recorded: advertPlans?.recorded,
      contentLength: advertPlans?.adverts?.map(function (advert: any) {
        return advert.ads.contentLength;
      }),
      quantity: advertPlans?.adverts?.map(function (advert: any) {
        return advert.qut;
      }),
      reptation: advertPlans?.priceConfig?.reptation,
      sponsoredLength: advertPlans?.sponsoredLength,
      sponsorshipPrice: advertPlans?.sponsorshipPrice,
      totalPrice: advertPlans?.adverts?.map(function (advert: any) {
        return (
          advert.qut *
          advert?.ads.contentLength *
          (advertPlans?.priceConfig.rate / advertPlans?.priceConfig.unit)
        );
      }),
    };
  });

  advertPlansData = advertPlansData?.map(function (advertPlans: any) {
    return {
      id: advertPlans?.id,
      stationId: advertPlans?.stationId,
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
      recorded:
        advertPlans?.recorded === null ? 'False' : advertPlans?.recorded === 'true' ? 'True' : '',
      contentLength: advertPlans?.contentLength.reduce(add, 0),
      quantity: advertPlans?.quantity.reduce(add, 0),
      reptation: advertPlans?.reptation,
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

  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (stationWithAds = stationData?.map(function (station: any) {
          return {
            id: station.id,
            name: station.name,
            discountPrice: station.discountPrice,
            adverts: advertPlansData?.filter((advert: any) => {
              return advert.stationId === station.id;
            }),
          };
        }))
      : null;
  }
  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (stationWithAds = stationWithAds?.map(function (station: any) {
          return {
            id: station.id,
            discountPrice: station.discountPrice,
            name: station.name,
            adverts: station?.adverts,
            advertPrices: station?.adverts
              .map((price: any) => {
                return price.prices;
              })
              .reduce(add, 0),
            advertPriceDiscount:
              station?.adverts
                .map((price: any) => {
                  return price.prices;
                })
                .reduce(add, 0) /
                station.discountPrice +
              station?.adverts
                .map((price: any) => {
                  return price.prices;
                })
                .reduce(add, 0) /
                station.discountPrice,
          };
        }))
      : null;
  }

  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (stationWithAds = stationWithAds?.map(function (station: any) {
          return {
            id: station.id,
            name: station.name,
            discountPrice: station.discountPrice,
            adverts: station?.adverts,
            advertPrices: station?.advertPrices,
            advertPriceDiscount: station?.advertPrices * (station.discountPrice / 100),
            // advertSum : station?.adverts,
          };
        }))
      : null;
  }

  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (stationWithAds = stationWithAds?.map(function (station: any) {
          return {
            id: station.id,
            name: station.name,
            discountPrice: station.discountPrice,
            adverts: station?.adverts,
            advertPrices: station?.advertPrices,
            advertPriceDiscount: station?.advertPriceDiscount,
            advertPriceAfterDiscount: station?.advertPrices - station?.advertPriceDiscount,
            advertPriceAfterDiscountVat:
              (station?.advertPrices - station?.advertPriceDiscount) * 0.15,
            advertPriceTotal:
              station?.advertPrices -
              station?.advertPriceDiscount +
              (station?.advertPrices - station?.advertPriceDiscount) * 0.15,
            // advertSum : station?.adverts,
          };
        }))
      : null;
  }

  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (stationWithAds = stationWithAds?.filter(function (station: any) {
          return station.adverts.length > 0;
        }))
      : null;
  }

  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (AdsPrice = stationWithAds?.map(function (station: any) {
          return station?.advertPriceTotal;
        }))
      : null;
  }
  {
    window.location.pathname !== `/dashboard/advert/advert-by-station/${stationId}`
      ? (totalAdsPrice = AdsPrice?.reduce(add, 0))
      : null;
  }

  advertPlansData = advertPlansData.sort(
    (firstItem: any, secondItem: any) => firstItem.dates - secondItem.dates
  );
  repetationSum = advertPlansData?.map(function (advertPlans: any) {
    return advertPlans?.reptation;
  });
  repetationSum = repetationSum.reduce(add, 0);

  const addDiscountPrice = (data: any) => {
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

  console.log('stationWithAds', stationWithAds);
  console.log('totalAdsPrice', totalAdsPrice);

  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={9} sm={12} xs={12}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {window.location.pathname === `/dashboard/advert/advert-by-station/${stationId}`
            ? 'Discount Price:-' + stationData.discountPrice
            : ''}
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ pl: 3 }}>
        <Grid item lg={9} md={9} sm={12} xs={12} sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Repetation:- {repetationSum}
          </Typography>
          <Typography variant="h3">{dataGridTitle}</Typography>
        </Grid>
        {window.location.pathname === `/dashboard/campaign/detail/${defaultValueCampaignId}` ? (
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <form onSubmit={handleSubmit(recordingForm)}>
              <Input type="hidden" value={setValue(`id`, defaultValueCampaignId)} />
              <Button variant="contained" type="submit">
                {recordResponse.isLoading ? 'Recording, Please Wait...' : 'Start Recording'}
              </Button>
            </form>
          </Grid>
        ) : null}
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

      <Grid sx={{ height: '400px', width: '100%', ml: 2 }}>
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
            const visibleRows = state.filter.visibleRowsLookup;

            let visibleItems: any = [];
            for (const [id, value] of Object.entries(visibleRows)) {
              if (value === true) {
                visibleItems?.push(id);
              }
            }

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
        ) : (
          <Grid>
            <AdvertPlanPriceComponent {...{ totalAdsPrice, stationWithAds }} />
          </Grid>
        )}
      </Grid>

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
