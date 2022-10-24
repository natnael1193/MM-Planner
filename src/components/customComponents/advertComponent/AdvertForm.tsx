import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { Controller, useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import ExternalProgram from './ExternalProgram';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import { useAdvertSchedulesQuery } from 'src/services/AdvertSchduleApi';
import {
  useProgramByStationQuery,
  useStationsQuery,
  useScheduleByProgramQuery,
} from 'src/services/ExternalScheduleApi';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAddAdvertMutation } from 'src/services/AdvertApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdvertModal from './AdvertModal';
import AdvertByPrograms from './AdvertByPrograms';
import { useSpotsQuery } from 'src/services/SpotApi';

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

const AdvertForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  const navigate = useNavigate();
  let advertPlansData: any = [];
  let stationsData: any = [];
  let programsData: any = [];
  let schedulesData: any = [];
  let stationId: any = 1;
  let programId: any = 1;
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [modal, setModal] = useState(null);
  let filteredModals: any = [];

  //React-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const {
    data: adsData,
    isLoading: adsLoading,
    isFetching: adsFetching,
    error: adsError,
  }: any = useSpotsQuery();

  const [addAdvert, result] = useAddAdvertMutation();

  if (
    isLoading ||
    isFetching ||
    stationLoading ||
    stationFetching ||
    programLoading ||
    scheduleLoading ||
    adsLoading ||
    adsFetching
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

  if (scheduleSucess) {
    schedulesData = schedule.data.schedules;
    schedulesData = schedulesData?.filter((schedules: any) => {
      return schedules !== null;
    });
    schedulesData = schedulesData?.map(function (schedules: any) {
      return {
        id: schedules.id,
        day: schedules.day,
        startTime: schedules.startTime,
        endTime: schedules.endTime,
        key: schedules.key,
        ads: adsData?.data,
      };
    });
  }

  if (error || stationError || adsError) return <Error />;

  if (result.isSuccess) {
    navigate('/dashboard/advert/list');
  }
  if (result.isError) {
    toast.error('Something went wrong, please try again later');
  }

  const onSubmit = (data: any) => {
    console.log(data);
    const newData: any = {
      name: data.name,
      key: data.key,
      days: data.adverts?.filter((day: any) => {
        return day.name !== false && day.adType !== undefined;
      }),
      programId: data.programId,
      stationId: data.stationId,
    };

    console.log(newData);

    // addAdvert(newData);
  };

  // console.log('modal', schedulesData);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('key', { required: true })} label="Key" fullWidth />
                <Typography color="red">{errors.key && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField {...register('name', { required: true })} label="Name" fullWidth />
                <Typography color="red">{errors.name && 'This is required'}</Typography>
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

              <Grid item lg={4} md={4} sm={12} xs={12}>
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

              <Grid item lg={4} md={4} sm={12} xs={12}>
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
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Day</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedulesData?.map((schedules: any, index: any) => {
                      return (
                        <AdvertByPrograms
                          {...{ register, control }}
                          scheduleData={schedules}
                          key={schedules.id}
                          nestIndex={index}
                          setValue={setValue}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2, ml: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default AdvertForm;
