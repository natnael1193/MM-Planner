import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import DraftCampaignSummary from './DraftCampaignSummary';
import ExternalProgram from './ExternalProgram';

const AdvertPlanForm = () => {
  return (
    <div>
      <Box>
        <Card sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                <TextField label="Advert Plan Name" fullWidth />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
                <TextField label="Advert Plan Description" multiline rows={5} fullWidth />
              </Grid>
              <Grid container sx={{ pr: 3 }} spacing={1}>
                <ExternalProgram />
              </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12}>
              <DraftCampaignSummary />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default AdvertPlanForm;
