import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import { useExternalStationsQuery } from 'src/services/ExternalProgramApi';
import { useForm } from 'react-hook-form';

const HolidayPriceForm = ({ defaultValue: initialValue, onFormSubmit }: any) => {
  const [campaignId, setCampaignId] = React.useState('');
  const [stationId, setStationId] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCampaignChange = (event: SelectChangeEvent) => {
    setCampaignId(event.target.value as string);
  };

  const handleStationChange = (event: SelectChangeEvent) => {
    setStationId(event.target.value as string);
  };

  const {
    data: campaignData,
    isLoading: campaignLoading,
    isError: campaignError,
  }: any = useCampaignsQuery();

  const {
    data: stationData,
    isLoading: stationLoading,
    isError: stationError,
  }: any = useExternalStationsQuery();

  if (campaignLoading || stationLoading) return <Loading />;
  if (campaignError || stationError) return <Error />;

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h3">Add/Edit Holiday Price</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register('campaignId')}
                  value={campaignId}
                  label="Campaign"
                  fullWidth
                  onChange={handleCampaignChange}
                >
                  {campaignData?.data?.map((campaign: any) => (
                    <MenuItem value={campaign.id} key={campaign.id}>
                      {campaign.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Station</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register('stationId')}
                  value={stationId}
                  label="Station"
                  fullWidth
                  onChange={handleStationChange}
                >
                  {stationData?.data?.map((station: any) => (
                    <MenuItem value={station.id} key={station.id}>
                      {station.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                {...register('startDate')}
                label="Start Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                {...register('endDate')}
                label="End Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
};

export default HolidayPriceForm;
