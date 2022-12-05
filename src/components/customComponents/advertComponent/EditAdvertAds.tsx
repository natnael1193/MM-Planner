import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  Modal,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Table,
  TableHead,
} from '@mui/material';
import React from 'react';
import {
  useDeleteAdvertAdsMutation,
  useUpdateAdvertAdsMutation,
  useUpdateMultipleAdvertAdsMutation,
} from 'src/services/AdvertApi';
import { useForm } from 'react-hook-form';
import { useSpotsQuery } from 'src/services/SpotApi';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditAdvertAds = ({
  defaultValues,
  priceData,
  priceLoading,
  priceFetching,
  priceError,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [adsId, setAdsId] = React.useState('');
  const [adId, setAdId] = React.useState('');
  const [adQuantity, setAdQuantity] = React.useState('');
  const [day, setDay] = React.useState('');
  let advertDays: any = [];

  advertDays = priceData?.data?.map(function (days: any) {
    return moment.utc(days.startTime).format('dddd').toLowerCase();
    // return days.startTime
  });

  const [days, setDays] = React.useState<string[]>(advertDays);

  const handleChange = (event: SelectChangeEvent<typeof days>) => {
    const {
      target: { value },
    } = event;
    setDays(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateAds, result] = useUpdateMultipleAdvertAdsMutation();
  const [deleteAds] = useDeleteAdvertAdsMutation();
  const { data: adsData, isLoading: adsLoading, error: adsError }: any = useSpotsQuery();

  let filteredAds: any = React.useState([]);
  const handleOpen = (id: any) => {
    setOpen(true);
    setAdsId(id);
  };
  const handleClose = () => setOpen(false);

  filteredAds = defaultValues?.adverts?.filter((ads: any) => {
    return ads.id === adsId;
  });
  filteredAds = filteredAds?.[0];

  const onSubmit = (data: any) => {
    console.log(data);
    const filteredData: any = {
      id: defaultValues.programId,
      modifiedCampainId: defaultValues.modifiedCampainId,
      adverts: [
        {
          day: data.day,
          adsId: data.adsId,
          qut: data.qut,
        },
      ],
    };
    console.log(filteredData);
    updateAds(filteredData);
    // reset();
    // setOpen(false);
  };

  console.log(defaultValues);
  console.log(adId);

  return (
    <TableBody>
      {priceData?.data?.map((ads: any) => {
        return (
          <TableRow key={ads.id}>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h4">{moment.utc(ads.startTime).format('dddd')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">
                {' '}
                {moment.utc(ads.startTime).format('hh:mm A')} -{' '}
                {moment.utc(ads.endTime).format('hh:mm A')}
              </Typography>
            </TableCell>
            <TableCell>
              {ads?.adverts?.map((ad: any) => (
                <Table key={ad.id} sx={{ width: '100%' }}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: '150px' }}>{ad?.ads?.name}</TableCell>
                      <TableCell sx={{ width: '50px' }}>{ad?.qut}</TableCell>
                      <TableCell sx={{ width: '200px' }}>
                        {' '}
                        <EditIcon
                          // variant="contained"
                          sx={{ mr: 2 }}
                          color="primary"
                          onClick={(e) => {
                            handleOpen(true);
                            setAdId(ad?.ads?.id);
                            setAdQuantity(ad?.qut);
                            setDay(moment.utc(ads.startTime).format('dddd').toLowerCase());
                            reset();
                          }}
                        >
                          Edit
                        </EditIcon>
                        <DeleteIcon
                          // variant="contained"
                          color="error"
                          onClick={() => {
                            deleteAds(ad.id);
                          }}
                        >
                          Delete
                        </DeleteIcon>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Input type="hidden" {...setValue('day', day)} />
                          <Input type="hidden" {...setValue('adsId', adId)} />
                          <Input
                            type="hidden"
                            {...setValue('modifiedAdvertPlanId', defaultValues?.id)}
                          />
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h4">Edit AD </Typography>
                          </Grid>
                          {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                            {adsLoading ? (
                              <CircularProgress />
                            ) : (
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ads </InputLabel>

                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Ads"
                                  {...register('adsId')}
                                  defaultValue={adId}
                                  // defaultValue={""}
                                  fullWidth
                                >
                                  {adsData?.data?.map((ads: any) => (
                                    <MenuItem key={ads.id} value={ads.id}>
                                      {ads.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </Grid> */}
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                              label="Quantity"
                              defaultValue={adQuantity}
                              {...register('qut')}
                              fullWidth
                            />
                          </Grid>
                        </Grid>

                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ mt: 2 }}
                          //   onClick={() => {
                          //     result.isSuccess === true ? setOpen(false) : null;
                          //   }}
                        >
                          Submit
                        </Button>
                      </form>
                    </Box>
                  </Modal>
                </Table>
              ))}
            </TableCell>
            {/* </TableBody> */}
            {/* </Table> */}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default EditAdvertAds;

const ITEM_HEIGHT = 64;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const daysList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
