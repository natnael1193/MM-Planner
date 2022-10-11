import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';
import { useSpotsQuery } from 'src/services/SpotApi';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';
import { useAdvertsQuery } from 'src/services/AdvertApi';
import { useAdvertPlansQuery, useAdvertPlanQuery } from 'src/services/AdvertPlanApi';
import moment from 'moment';

const AdvertDetailForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  const [contentType, setContentType] = React.useState('');
  const [spotContent, setSpotContent] = React.useState<string[]>([]);
  const [advertContent, setAdvertContent] = React.useState('');
  const [advertId, setAdvertId] = React.useState('');
  const [advertPlanId, setAdvertPlanId]: any = React.useState(
    defaultValues.advertPlanId !== undefined ? defaultValues.advertPlanId : ''
  );
  // const [advertPlanDetailData, setAdvertPlanDetailData]: any = React.useState('');

  let spotData: any = [];
  let advertContentData: any = [];
  let advertPlanData: any = [];
  let advertPlanDetailData: any = [];


  // setAdvertPlanId(defaultValues.advertPlanId);

  //Spot Data
  const { data, isLoading, error, isSuccess } = useSpotsQuery();

  //Get All Advert Plan
  const {
    data: advetPlan,
    error: advertPlanError,
    isLoading: advertPlanLoading,
    isSuccess: advertPlanSuccess,
  } = useAdvertPlansQuery();

  //Get All Advert Plan
  const {
    data: advertPlanDetail,
    error: advertPlanDetailError,
    isLoading: advertPlanDetailLoading,
    isFetching: advertPlanDetailFetching,
    isSuccess: advertPlanDetailSuccess,
  }: any = useAdvertPlanQuery(advertPlanId);

  // Advert Content Data
  // const {
  //   data: advertData,
  //   isLoading: advertLoading,
  //   error: advertError,
  //   isSuccess: advertSuccess,
  // } = useAdvertsQuery();

  const handleChange = (event: SelectChangeEvent<typeof spotContent>) => {
    const {
      target: { value },
    } = event;
    setSpotContent(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const advertHandleChange = (event: SelectChangeEvent) => {
    // setAdvertContent(event.target.value);
    setAdvertId(event.target.value)
  };

  const advertPlanHandleChange = (event: SelectChangeEvent) => {
    setAdvertPlanId(event.target.value);
  };

  const handleSpotChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value as string);
  };

  //React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  if (isLoading || advertPlanLoading || advertPlanDetailLoading || advertPlanDetailFetching) return <Loading />;

  // if (isSuccess) {
  //   spotData = data?.map(function (spotContents: any) {
  //     return {
  //       id: spotContents.id,
  //       name: spotContents.name,
  //       value: spotContents.name,
  //     };
  //   });
  // }
  if (isSuccess) {
    spotData = data;
  }

  // if (advertSuccess) {
  //   advertContentData = advertData;
  // }

  if (advertPlanSuccess) {
    advertPlanData = advetPlan;
  }



  if (advertPlanDetailSuccess) {
          advertPlanDetailData = advertPlanDetail.data?.adverts;
  }
  

  if (error || advertPlanError) return <Error />;

  console.log(advertPlanData);
  console.log(advertPlanDetail.data?.adverts);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Key"
                  {...register('key', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.key && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  {...register('quantity', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.quantity && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl sx={{ mt: 1, width: '100%' }}>
                  <InputLabel id="demo-simple-select-label">Spot</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('spotId', { required: true })}
                    fullWidth
                    // value={contentType}
                    label="Spot"
                    onChange={handleSpotChange}
                    defaultValue={defaultValues.spotId !== undefined ? defaultValues.spotId : ''}
                  >
                    {spotData.data.map((spot: any) => {
                      return (
                        <MenuItem key={spot.id} value={spot.id}>
                          {spot.key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Typography color="red">{errors.spotId && 'This is required'}</Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-helper-label">Advert Plan</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    {...register('advertPlanId', { required: true })}
                    // value={campaignContent}
                    label="Advert Plan"
                    onChange={advertPlanHandleChange}
                    defaultValue={
                      defaultValues.advertPlanId !== undefined ? defaultValues.advertPlanId : ''
                    }
                  >
                    {advertPlanData.data.map((advert: any) => {
                      return (
                        <MenuItem key={advert.id} value={advert.id}>
                          {advert.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Typography color="red">{errors.advertPlanId && 'This is required'}</Typography>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-helper-label">Advert </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    {...register('advertId', { required: true })}
                    // value={defaultValues.advertId}
                    label="Advert"
                    // onChange={advertPlanHandleChange}
                    defaultValue={
                      defaultValues.advertId !== undefined ? defaultValues.advertId : ''
                    }
                  >
                    {
                        advertPlanDetailData?.map((advert: any) => {
                          return (
                            <MenuItem key={advert.id} value={advert.id}>
                              {advert.name} ( { moment.utc(advert.startTime).format('Do dd, MM YYYY hh:mm')} - {moment.utc(advert.endTime).format('Do dd, MM YYYY hh:mm')} )
                            </MenuItem>
                          );
                        })}
                  </Select>
                  <Typography color="red">{errors.advertPlanId && 'This is required'}</Typography>
                </FormControl>
              </Grid>

              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl sx={{ mt: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Spot Contents</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    label="Spot Contents"
                    id="demo-multiple-checkbox"
                    {...register('spotContentIds')}
                    fullWidth
                    multiple
                    value={defaultValues.spotContentIds}
                    onChange={handleChange}
                    input={<OutlinedInput label="Spot Contents" />}
                    renderValue={(selected) =>
                      selected.map((obj: any) => spotData[obj - 1].value).join(', ')
                    }
                    defaultValue={
                      defaultValues.spotContentIds !== undefined ? defaultValues.spotContentIds : []
                    }
                  >
                    {spotData.map((name: any) => (
                      <MenuItem key={name.id} value={name.id}>
                        <Checkbox checked={spotContent.indexOf(name.id) > -1} />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
                <TextField label="Quantity" {...register('quantity')} type={'number'} fullWidth />
              </Grid> */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default AdvertDetailForm;
