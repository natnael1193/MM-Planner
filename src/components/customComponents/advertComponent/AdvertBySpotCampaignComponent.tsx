import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import React from 'react';

const AdvertBySpotCampaignComponent = () => {
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
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
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
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
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
              <Grid item lg={5} md={5} sm={5} xs={5}>
                Fana 120
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={5}>
                09:00 AM - 12:00 PM
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 5 }}>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Switch />
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={5}>
                Fana 90
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={5}>
                09:00 AM - 12:00 PM
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 5 }}>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Switch />
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={5}>
                Sport Zone
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={5}>
                09:00 AM - 12:00 PM
              </Grid>
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
