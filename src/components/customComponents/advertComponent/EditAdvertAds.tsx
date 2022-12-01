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
} from '@mui/material';
import React from 'react';
import { useDeleteAdvertAdsMutation, useUpdateAdvertAdsMutation } from 'src/services/AdvertApi';
import { useForm } from 'react-hook-form';
import { useSpotsQuery } from 'src/services/SpotApi';

const EditAdvertAds = ({ defaultValues }: any) => {
  const [open, setOpen] = React.useState(false);
  const [adsId, setAdsId] = React.useState('');

  const [days, setDays] = React.useState<string[]>([
    'sunday',
    'monday',
    'tuesday'
  ]);

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

  const [updateAds, result] = useUpdateAdvertAdsMutation();
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
    // console.log(data);
    const newData = days?.map(function (day: any) {
      return {
        day: day,
        id: data.id,
        adsId: data.adsId,
        qut: data.qut,
        modifiedAdvertPlanId: data.modifiedAdvertPlanId,
      };
    });

    // {
    //   id: data.id,
    //   adsId: data.adsId,
    //   qut: data.qut,
    //   modifiedAdvertPlanId: data.modifiedAdvertPlanId,
    //   days: days
    // };
    console.log(newData);
    // updateAds(data);
    // reset();
    // setOpen(false);
  };

  console.log(result);

  return (
    <TableBody>
      {defaultValues?.adverts?.map((ads: any) => {
        return (
          <TableRow key={ads.id}>
            <TableCell></TableCell>
            <TableCell>{ads.ads.name}</TableCell>
            <TableCell>{ads.qut}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  handleOpen(ads.id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteAds(ads.id);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Input type="hidden" {...setValue('id', filteredAds?.id)} />
              <Input type="hidden" {...setValue('modifiedAdvertPlanId', defaultValues?.id)} />
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h4">Edit AD </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {adsLoading ? (
                  <CircularProgress />
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ads</InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Ads"
                      {...register('adsId')}
                      defaultValue={filteredAds?.ads?.id}
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
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  defaultValue={filteredAds?.qut}
                  label="Quantity"
                  {...register('qut')}
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Days</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={days}
                    onChange={handleChange}
                    input={<OutlinedInput label="Days" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    fullWidth
                    // defaultValue={'monday'}
                  >
                    {daysList.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={days.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
