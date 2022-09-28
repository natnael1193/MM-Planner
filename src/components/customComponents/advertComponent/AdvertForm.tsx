import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import ExternalProgram from './ExternalProgram';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import { useAdvertSchedulesQuery } from 'src/services/AdvertSchduleApi';
import {
  useProgramByStationQuery,
  useStationsQuery,
  useScheduleByProgramQuery,
} from 'src/services/ExternalScheduleApi';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'day', headerName: 'Day', width: 300 },
  { field: 'startTime', headerName: 'Start Time', width: 300 },
  {
    field: 'endTime',
    headerName: 'End Time',
    type: 'number',
    width: 300,
  },
];

const rows = [
  { id: 1, startTime: 'Monday', day: 'Monday', endTime: 35 },
  { id: 2, startTime: 'Tuesday', day: 'Tuesday', endTime: 42 },
  { id: 3, startTime: 'Wendsday', day: 'JaWendsdayime', endTime: 45 },
  { id: 4, startTime: 'Thursday', day: 'Thursday', endTime: 16 },
  { id: 5, startTime: 'Friday', day: 'Friday', endTime: null },
  { id: 6, startTime: 'Saturday', day: 'Saturday', endTime: 150 },
  { id: 7, startTime: 'Sunday', day: 'Sunday', endTime: 44 },
];

const AdvertForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  let advertPlansData: any = [];
  let stationsData: any = [];
  let programsData: any = [];
  let schedulesData: any = [];
  let stationId: any = 1;
  let programId: any = 1;
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  //React-hook-form
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  stationId = watch('stationId');
  programId = watch('programId');

  //Get All Advert Plan
  const { data: advertPlan, isLoading, isFetching, isSuccess, error } = useAdvertPlansQuery();

  //Get All Stations
  const {
    data: station,
    isLoading: stationLoading,
    isFetching: stationFetching,
    isSuccess: stationSucess,
    error: stationError,
  } = useStationsQuery();

  //Get Station By ID
  const {
    data: program,
    isLoading: programLoading,
    isFetching: programFetching,
    isSuccess: programSucess,
    error: programError,
  }: any = useProgramByStationQuery(stationId);

  const {
    data: schedule,
    isLoading: scheduleLoading,
    isFetching: scheduleFetching,
    isSuccess: scheduleSucess,
    error: scheduleError,
  }: any = useScheduleByProgramQuery(programId);

  if (
    isLoading ||
    isFetching ||
    stationLoading ||
    stationFetching ||
    programLoading ||
    scheduleLoading
  )
    return <Loading />;

  if (isSuccess) {
    advertPlansData = advertPlan;
  }

  if (stationSucess) {
    stationsData = station;
  }

  if (programSucess) {
    programsData = program.data.programs;
  }

  // if(scheduleSucess){
  //   schedulesData =
  // }

  if (error || stationError) return <Error />;

  // console.log(station)
  // console.log(program)
  // console.log(schedule);
  console.log(selectedSchedules);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('key', { required: true })} label="Key" fullWidth />
                <Typography color="red">{errors.key && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('name', { required: true })} label="Name" fullWidth />
                <Typography color="red">{errors.name && 'This is required'}</Typography>
              </Grid>
              {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('advertType')} label="Advert Type" fullWidth />
              </Grid> */}
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <div>
                        <InputLabel id="demo-simple-select-label">Advert Plan</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Advert Plan"
                          {...field}
                          fullWidth
                        >
                          {advertPlansData.data?.map((advertPlan: any) => {
                            return (
                              <MenuItem key={advertPlan.id} value={advertPlan.id}>
                                {advertPlan.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    )}
                    control={control}
                    name="advertPlanId"
                    defaultValue={
                      defaultValues.advertPlanId !== undefined ? defaultValues.advertPlanId : ''
                    }
                  />
                  <Typography color="red">{errors.advertPlanId && 'This is required'}</Typography>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <div>
                        <InputLabel id="demo-simple-select-label">Station</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Station"
                          {...field}
                          fullWidth
                        >
                          {stationsData.data?.map((station: any) => {
                            return (
                              <MenuItem key={station.id} value={station.id}>
                                {station.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    )}
                    control={control}
                    name="stationId"
                    defaultValue=""
                  />
                  <Typography color="red">{errors.stationId && 'This is required'}</Typography>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <div>
                        <InputLabel id="demo-simple-select-label">Program</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Program"
                          {...field}
                          fullWidth
                        >
                          {programsData?.map((station: any) => {
                            return (
                              <MenuItem key={station.id} value={station.id}>
                                {station.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    )}
                    control={control}
                    name="programId"
                    defaultValue=""
                  />
                  <Typography color="red">{errors.programId && 'This is required'}</Typography>
                </FormControl>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pl:5}}>
                <div style={{ height: 460, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    hideFooterPagination
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRows: any = rows.filter((row) => selectedIDs.has(row.id));

                      setSelectedSchedules(selectedRows);
                    }}
                    // {...data}
                  />
                  <Typography color="red" style={{ marginTop: '-25px'}}>
                    {selectedSchedules.length === 0 ? 'One date must be selected' : ''}
                  </Typography>
                </div>
              </Grid>

              {/* <ExternalProgram /> */}
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pl:5}}>
                {
                  selectedSchedules.length === 0 ? (
                    <Button variant="contained" disabled>
                    {' '}
                    Submit{' '}
                  </Button>
                  )
                  :
                  (
                    <Button variant="contained" type="submit" >
                    {' '}
                    Submit{' '}
                  </Button>
                  )
                }
          
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default AdvertForm;
