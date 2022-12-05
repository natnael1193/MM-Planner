import {
  Button,
  TextField,
  Typography,
  Card,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import React from 'react';

import { useCampaignsQuery } from '../../../services/CamapignApi';
import { useSpotsQuery } from '../../../services/SpotApi';
import Error from '../../../pages/customPages/shared/Error';
import Loading from '../../../pages/customPages/shared/Loading';
import { useExtenalPriceConfigsQuery } from 'src/services/ExternalProgramApi';
import { TableRow } from '@mui/material';
import EditAdvertAds from './EditAdvertAds';
import EditAdvertPrice from './EditAdvertPrice';
import AddAdvertsAds from './AddAdvertsAds';
import { useAdvertPricesQuery } from 'src/services/AdvertApi';
import { GridSelectionModel } from '@mui/x-data-grid';

const EditAdvertForm = ({ defaultValues, onFormSubmit }: any) => {
  let campaignsData: any = [];
  let adsData: any = [];
  let priceConfigsData: any = [];
  const [openAddAds, setOpenAddAds] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const programId: any = defaultValues?.programId;
  const {
    data: priceData,
    isLoading: priceLoading,
    isFetching: priceFetching,
    isError: priceError,
  }: any = useAdvertPricesQuery(programId);

  const {
    data: campaignData,
    isLoading: campaignLoading,
    error: campaignError,
  } = useCampaignsQuery();
  const { data: adData, isLoading: adLoading, error: adError } = useSpotsQuery();
  const {
    data: priceConfigData,
    isLoading: priceConfigLoading,
    error: priceConfigError,
  } = useExtenalPriceConfigsQuery();

  //Loading State
  if (campaignLoading || adLoading || priceConfigLoading) return <Loading />;

  // Return an error if there is an error
  if (campaignError || adError || priceConfigError) return <Error />;

  campaignsData = campaignData;
  adsData = adData;
  priceConfigsData = priceConfigData;
  priceConfigsData = priceConfigsData?.data?.filter((priceConfig: any) => {
    return priceConfig.priceCategory.program.id === defaultValues.programId;
  });

  // console.log(priceConfigsData);
  // console.log(defaultValues.programId);

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 2 }}>
              <Typography variant="h3">Edit Advert</Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Campaign"
                  defaultValue={defaultValues?.modifiedCampainId}
                  displayEmpty
                  {...register('campainId', { required: true })}
                >
                  {campaignsData?.data?.map((campaigns: any) => {
                    return (
                      <MenuItem value={campaigns.id} key={campaigns.id}>
                        {campaigns.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Typography variant="inherit" color="red">
                  {errors.adsId && 'This is required'}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Advert Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Advert Type"
                  defaultValue={defaultValues?.advertType}
                  displayEmpty
                  {...register('advertType', { required: true })}
                >
                  <MenuItem value="Sponsorship">Sponsor Ship</MenuItem>
                  <MenuItem value="Spot">Spot</MenuItem>
                </Select>
                <Typography variant="inherit" color="red">
                  {errors.advertType && 'This is required'}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Price Config"
                  defaultValue={defaultValues?.priceConfigId}
                  displayEmpty
                  {...register('priceConfigId', { required: true })}
                >
                  {priceConfigsData?.map((priceConfigs: any) => {
                    return (
                      <MenuItem value={priceConfigs.id} key={priceConfigs.id}>
                        {priceConfigs.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Typography variant="inherit" color="red">
                  {errors.adpriceConfigIdsId && 'This is required'}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Start Date"
                // inputProps={{ step: 1 }}
                {...register('startTime', { required: true })}
                type="datetime-local"
                fullWidth
              />
              <Typography variant="inherit" color="red">
                {errors.qut && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="End Date"
                // inputProps={{ step: 1 }}
                {...register('endTime', { required: true })}
                type="datetime-local"
                fullWidth
              />
              <Typography variant="inherit" color="red">
                {errors.qut && 'This is required'}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>

      <Card sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
            <Typography variant="h3">Edit Advert Prices</Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <EditAdvertPrice
              {...{
                defaultValues,
                priceConfigsData,
                priceData,
                priceLoading,
                priceFetching,
                priceError,
              }}
            />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mb: 2 }}>
            <Typography variant="h3">Ads</Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpenAddAds(true);
              }}
            >
              Add Ads
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                // size={dense ? 'small' : 'medium'}
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Day</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Ads</TableCell>
                    {/* <TableCell>Quantity</TableCell>
                    <TableCell>Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <EditAdvertAds
                  {...{ defaultValues, priceData, priceLoading, priceFetching, priceError }}
                />
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>

      <AddAdvertsAds {...{ openAddAds, setOpenAddAds, defaultValues }} />
    </div>
  );
};

export default EditAdvertForm;
