import {
  Grid,
  Switch,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  Button,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';

const AdsBySpotAndCampaignComponent = ({
  register,
  adsData,
  adTypeClicked,
  programs,
  index,
}: any) => {
  const [checked, setChecked] = React.useState(false);

  console.log(adTypeClicked);
//   console.log(adsData);
  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 5 }} key={programs.id}>
        <Grid container sx={{ mb: 5 }}>
          <Grid item lg={2} md={2} sm={2} xs={2}>
            <Switch
              onClick={() => {
                checked === true ? setChecked(false) : setChecked(true);
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            {programs.name}
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={4}>
            {moment.utc(programs.startTime).format('hh:mm A')} -{' '}
            {moment.utc(programs.endTime).format('hh:mm A')}
          </Grid>
          {adTypeClicked === 'Sponsorship' && checked === true ? (
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <TextField label="Sponsored Length" {...register('sponsoredLength')} fullWidth />
            </Grid>
          ) : adTypeClicked === 'Spot' && checked === true ? (
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adsData?.data?.map((spots: any) => {
                    return (
                      <TableRow key={spots.id}>
                        <TableCell>
                          <Input
                            type="checkbox"
                            {...register(`adverts[${index}].adsId` as const)}
                            defaultValue={spots.id}
                          />
                        </TableCell>
                        <TableCell>{spots.name}</TableCell>
                        <TableCell>
                          <Input {...register(`adverts[${index}].qut` as const)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
  
    </Grid>
  );
};

export default AdsBySpotAndCampaignComponent;
