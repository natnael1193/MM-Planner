import React from 'react';
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

const AdsByDaysComponent = ({ nestIndex, control, register, item, isChecked, isCheckAll }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `adverts[${nestIndex}].ads`,
  });

  console.log(item);

  return (
    <div>
      <Collapse in={isChecked || isCheckAll}>
        <Grid item style={{ marginLeft: 20 }} lg={4} md={6} sm={12} xs={12}>
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
            >
              <MenuItem value={'Spot'}>Spot</MenuItem>
              <MenuItem value={'Sponsorship'}>Sponsorship</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
                      defaultValue={0}
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
