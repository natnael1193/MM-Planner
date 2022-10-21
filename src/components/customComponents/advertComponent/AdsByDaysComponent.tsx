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
        <Grid style={{ marginLeft: 20 }}>
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
        <Typography variant='h4' sx={{ m: 2, mb:0}}>Ads</Typography>
        {item.map((item: any, k: any) => {
          return (
            <Grid key={item.id} style={{ marginLeft: 20 }}>
              <TableCell>
                <Input
                  {...register(`adverts[${nestIndex}].ads[${k}].name` as const)}
                  defaultValue={item.name}
                  type="checkbox"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </Grid>
          );
        })}
      </Collapse>
    </div>
  );
};

export default AdsByDaysComponent;
