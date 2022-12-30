import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { useCampaignsQuery } from 'src/services/CamapignApi';

const CampaignForm = ({ formTitle, onFormSubmit, defaultValues, response }: any) => {
  const [campaignId, setCampaignId] = useState('');
  const [usePreviousCampaign, setUsePreviousCampaign] = useState(false);

  const handleCampaignChange = (event: SelectChangeEvent) => {
    setCampaignId(event.target.value as string);
  };
  const usePreviousCampaignHandle = () => {
    usePreviousCampaign === false ? setUsePreviousCampaign(true) : setUsePreviousCampaign(false);
  };

  // React-hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const {
    data: campaignData,
    isLoading: camapignLoading,
    error: campaignError,
  }: any = useCampaignsQuery();

  if (camapignLoading) return <Loading />;
  if (campaignError) return <Error />;

  console.log(usePreviousCampaign);

  return (
    <div>
      <Grid>
        <Card sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h3">{formTitle}</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item lg={6} md={6} sm={12}>
                <TextField label="Alias" fullWidth {...register('key', { required: true })} />
                <Typography color="red">{errors.key && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  label="Campaign Name"
                  fullWidth
                  {...register('name', { required: true })}
                />
                <Typography color="red">{errors.name && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  label="Start Date"
                  inputProps={{ step: 1 }}
                  fullWidth
                  {...register('startDate', { required: true })}
                />
                <Typography color="red">{errors.startDate && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  label="End Date"
                  inputProps={{ step: 1 }}
                  fullWidth
                  {...register('endDate', { required: true })}
                />
                <Typography color="red">{errors.endDate && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <TextField
                  label="Description"
                  fullWidth
                  {...register('description', { required: true })}
                />
                <Typography color="red">{errors.description && 'This is required'}</Typography>
              </Grid>
              {window.location.pathname === `/dashboard/campaign/add` ? (
                <Grid item lg={6} md={12} sm={12}>
                  <Grid container>
                    <Grid item lg={1} md={1} sm={1}>
                      <Input type="checkbox" onClick={usePreviousCampaignHandle} />
                      <Input
                        type="hidden"
                        value={
                          usePreviousCampaign === true
                            ? setValue(`usePrevSetting`, true)
                            : setValue(`usePrevSetting`, false)
                        }
                      />
                    </Grid>
                    <Grid item lg={9} md={11} sm={11}>
                      <Typography variant="inherit">
                        Do You Want To Use Pervious Campaigns Advert Plans ?
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="red">{errors.endDate && 'This is required'}</Typography>
                </Grid>
              ) : null}

              {usePreviousCampaign === true ? (
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
              ) : null}
            </Grid>
            <Button type="submit" variant="contained" sx={{ ml: 2, mt: 2 }}>
              {response.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default CampaignForm;
