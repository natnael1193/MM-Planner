import {
  Box,
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
import { useForm } from 'react-hook-form';
import DraftCampaignSummary from './DraftCampaignSummary';
import ExternalProgram from './ExternalProgram';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';
import { useCampaignsQuery } from 'src/services/CamapignApi';

const AdvertPlanForm = ({ formTitle, onFormSubmit, defaultValues, submitLoading }: any) => {
  const [campaignContent, setCampaignContent] = React.useState('');
  let campaignContentData: any = [];

  //Campaign Content Data
  const { data, isLoading, error, isSuccess } = useCampaignsQuery();

  const handleChange = (event: SelectChangeEvent) => {
    setCampaignContent(event.target.value);
  };

  //React-hook-form
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (isLoading) return <Loading />;

  if (isSuccess) {
    campaignContentData = data;
  }

  if (error) return <Error />;

  console.log(campaignContentData);
  // console.log(defaultValues)

  return (
    <div>
      <Box>
        <Card sx={{ p: 4 }}>
          <Typography variant="h3">Add Advert Plan</Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField label="Key" fullWidth {...register('key')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField label="Advert Plan Name" fullWidth {...register('name')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-helper-label">Campaign</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    {...register('campainId')}
                    // value={campaignContent}
                    label="Campaign"
                    onChange={handleChange}
                    defaultValue={
                      defaultValues.campainId !== undefined ? defaultValues.campainId : ''
                    }
                  >
                    {campaignContentData.data.map((campaign: any) => {
                      return (
                        <MenuItem key={campaign.id} value={campaign.id}>
                          {campaign.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  label="Advert Plan Description"
                  multiline
                  rows={5}
                  fullWidth
                  {...register('description')}
                />
              </Grid>
              {/* <Grid container sx={{ pr: 3 }} spacing={1}>
                <ExternalProgram />
              </Grid> */}
              {/* <Grid item lg={3} md={4} sm={12} xs={12}>
              <DraftCampaignSummary />
            </Grid> */}
              <Button type="submit" sx={{ ml: 3, mt: 2 }} variant="contained">
                {submitLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default AdvertPlanForm;
