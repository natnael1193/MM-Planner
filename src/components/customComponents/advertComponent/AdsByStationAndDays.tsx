import { CheckBox } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Input,
} from '@mui/material';
import React from 'react';

const AdsBySatationAndDays = () => {
  return (
    <Grid container sx={{ mt: 3 }} spacing={2}>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Campaign"
            displayEmpty
            defaultValue={''}
          >
            <MenuItem>ppp</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Ad Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Ad Type"
            displayEmpty
            defaultValue={''}
          >
            <MenuItem>ppp</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Price Category"
            displayEmpty
            defaultValue={''}
          >
            <MenuItem>ppp</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Price Config"
            displayEmpty
            defaultValue={''}
          >
            <MenuItem>ppp</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <CheckBox />
              </TableCell>
              <TableCell>Batele</TableCell>
              <Input></Input>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default AdsBySatationAndDays;
