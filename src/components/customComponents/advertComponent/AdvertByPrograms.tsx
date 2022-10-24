import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  IconButton,
  TableBody,
  Input,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import { useFieldArray } from 'react-hook-form';

const AdvertByPrograms = ({ register, control, setValue, scheduleData, nestIndex }: any) => {
  const [open, setOpen] = React.useState(false);
  const { fields, remove, append } = useFieldArray({
    control,
    name: `adverts[${nestIndex}].ads`,
  });

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              open === false
                ? (setValue(`adverts[${nestIndex}].name`, scheduleData?.day),
                  setValue(`adverts[${nestIndex}].scheduleId`, scheduleData?.id))
                : (setValue(`adverts[${nestIndex}].name`, ''),
                  setValue(`adverts[${nestIndex}].scheduleId`, ''));
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {scheduleData?.day}
        </TableCell>
        <TableCell>{moment.utc(scheduleData?.startTime).format('h:mm A')}</TableCell>
        <TableCell>{moment.utc(scheduleData?.endTime).format('h:mm A')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid item style={{ marginBottom: 5 }} lg={4} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Ad Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ad Type"
                    displayEmpty
                    {...register(`adverts[${nestIndex}].adType` as const)}
                    defaultValue={''}
                    required={open === true ? true : false}
                  >
                    <MenuItem value={'Spot'}>Spot</MenuItem>
                    <MenuItem value={'Sponsorship'}>Sponsorship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Ads Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleData.ads.map((ads: any, k: any) => (
                    <TableRow key={ads.id}>
                      <TableCell>
                        <Input
                          {...register(`adverts[${nestIndex}].ads[${k}].name` as const)}
                          defaultValue={ads.name}
                          type="checkbox"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {ads.name}
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Input
                          {...register(`adverts[${nestIndex}].ads[${k}].quantity` as const)}
                          defaultValue={0}
                          type="number"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default AdvertByPrograms;