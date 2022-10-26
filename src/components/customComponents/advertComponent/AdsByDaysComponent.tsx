import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  Typography,
  Grid,
  TableCell,
  Input,
  Collapse,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Select,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
} from '@mui/material';

const AdsByDaysComponent = ({ nestIndex, control, register, setValue, item, isChecked, isCheckAll }: any) => {
  const [openSponsorshipFields, setOpenSponsorshipFields] = useState('')
  const { fields, remove, append } = useFieldArray({
    control,
    name: `adverts[${nestIndex}].ads`,
  });


  return (
    <div>
      <Collapse in={isChecked || isCheckAll}>
        <Grid item style={{ marginLeft: 20, marginBottom: 20 }} lg={4} md={6} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ad Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Ad Type"
              displayEmpty
              {...register(`adverts[${nestIndex}].adType` as const)}
              defaultValue={''}
              required={isChecked === true ? true : false}
              value={openSponsorshipFields}
              onChange={(event: any) => {
                setOpenSponsorshipFields((event.target.value as string))
              }}
            >
              <MenuItem value={'Spot'}>Spot</MenuItem>
              <MenuItem value={'Sponsorship'}>Sponsorship</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {
          openSponsorshipFields === "Sponsorship"
            ?
            <Grid container spacing="10" sx={{ pl: 2, pr: 2 }}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
                  <TextField {...register(`adverts[${nestIndex}].sponsorshipLength` as const)} label="Sponsorship Length" type="number" fullWidth />
                  </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField {...register(`adverts[${nestIndex}].sponsorshipPrice` as const)} label="Sponsorship Price" type="number" fullWidth />
              </Grid>
            </Grid>
            :
            <Grid container spacing="10" sx={{ pl: 2, pr: 2 }}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
              <input hidden {...setValue(`adverts[${nestIndex}].sponsorshipLength`, null)} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <input hidden  {...setValue(`adverts[${nestIndex}].sponsorshipPrice`, null)}/>
              </Grid>
            </Grid>
        }
      </Collapse>
      <Collapse in={isChecked || isCheckAll}>
        {/* <Typography variant="h4" sx={{ m: 2, mb: 0 }}>
          Ads
        </Typography> */}
        <TableContainer sx={{ mt: 2, ml: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ads Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          {item.map((item: any, k: any) => {
            return (
              <TableBody key={k}>
                <TableRow>
                  <TableCell>
                    <Input
                      {...register(`adverts[${nestIndex}].ads[${k}].adsId` as const)}
                      defaultValue={item.id}
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {' '}
                    <Input
                      {...register(`adverts[${nestIndex}].ads[${k}].qut` as const)}
                      defaultValue={1}
                      type="number"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </TableContainer>
      </Collapse>
    </div>
  );
};

export default AdsByDaysComponent;
