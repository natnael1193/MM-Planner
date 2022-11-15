import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';

const AdvertBySpotCampaignComponent = ({ campaignData }: any) => {
  const [sponsoredClciked, setSponsoredClicked] = React.useState('');
  console.log('sponsoredClciked', sponsoredClciked);
  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Campaign"
                displayEmpty
                defaultValue={''}
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
              >
                {campaignData?.map((campaings: any) => (
                  <MenuItem value={campaings.id} key={campaings.id}>
                    {campaings.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Advert Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Campaign"
                displayEmpty
                defaultValue={''}
                value={sponsoredClciked}
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
                onChange={(e: any) => {
                  setSponsoredClicked(e.target.value);
                }}
              >
                <MenuItem value="Spot">Spot</MenuItem>
                <MenuItem value="Sponsorship">Sponsorship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 5 }}>
            <Grid container sx={{ mb: 5 }}>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Switch />
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                Fana 90
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                09:00 AM - 12:00 PM
              </Grid>
              {sponsoredClciked === 'Sponsorship' ? (
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <TextField label="Sponsored Length" fullWidth />
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default AdvertBySpotCampaignComponent;
