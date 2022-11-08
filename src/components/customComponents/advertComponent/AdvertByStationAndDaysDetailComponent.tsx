import { Card, Collapse, Grid, Input, Switch, Typography } from '@mui/material';
import React from 'react';
import AdsByStationAndDays from './AdsByStationAndDays';
import moment from 'moment';

const AdvertByStationAndDaysDetailComponent = ({
  programs,
  stationId,
  register,
  errors,
  index,
  setValue,
}: any) => {
  const [showAds, setShowAds] = React.useState(false);
  const showAdsHandleChange = () => {
    showAds === false ? setShowAds(true) : setShowAds(false);
    showAds === false
      ? (setValue(`ads[${index}].isClicked`, true),
        setValue(`ads[${index}].scheduleId`, programs.id))
      : (setValue(`ads[${index}].isClicked`, false), setValue(`ads[${index}].scheduleId`, null));
  };
  // console.log('showAds', showAds);
  return (
    <Grid item lg={6} md={12} sm={12} xs={12}>
      <Card sx={{ p: 5 }}>
        <Grid container>
          <Grid item lg={2} md={2} sm={3} xs={3}>
            <Switch onClick={showAdsHandleChange} />
          </Grid>
          <Grid item lg={10} md={10} sm={9} xs={9}>
            <Typography variant="h4">{programs.program.name}</Typography>
            <Typography variant="h5">
              {moment.utc(programs.startTime).format('hh:mm A')}-{' '}
              {moment.utc(programs.endTime).format('hh:mm A')}
            </Typography>
          </Grid>
        </Grid>

        <Collapse in={showAds}>
          <AdsByStationAndDays
            stationId={stationId}
            {...{ register, errors, setValue }}
            programs={programs}
            index={index}
          />
        </Collapse>
      </Card>
    </Grid>
  );
};

export default AdvertByStationAndDaysDetailComponent;
