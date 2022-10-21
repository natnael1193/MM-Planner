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

  const [addAdvert, result] = useAddAdvertMutation();

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

  if (scheduleSucess) {
    schedulesData = schedule.data.schedules;
    schedulesData = schedulesData?.filter((schedules: any) => {
      return schedules !== null;
    });
  }

  if (error || stationError) return <Error />;

  if (result.isSuccess) {
    navigate('/dashboard/advert/list');
  }
  if (result.isError) {
    toast.error('Something went wrong, please try again later');
  }

  const onSubmit = (data: any) => {
    const newData: any = {
      name: data.name,
      advertPlanId: data.advertPlanId,
      key: data.key,
      schedules: selectedSchedules,
    };

    addAdvert(newData);
  };

  console.log('modal', schedulesData);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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

              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pl: 5 }}>
                <div style={{ height: 460, width: '100%' }}>
                  <DataGrid
                    rows={
                      schedulesData === undefined || programsData.length === 0 ? [] : schedulesData
                    }
                    columns={columns}
                    checkboxSelection
                    hideFooterPagination
                    onSelectionModelChange={(ids: any) => {
                      const selectedIDs: any = new Set(ids);
                      const selectedRows: any =
                        schedulesData === undefined
                          ? []
                          : schedulesData.filter((row: any) => selectedIDs.has(row.id));

                      setSelectedSchedules(selectedRows);
                      setModal(ids.slice(-1).pop());
                      filteredModals = selectedRows.push(ids);
                    }}
                    // {...data}
                  />
                  <Typography color="red" style={{ marginTop: '-25px' }}>
                    {selectedSchedules.length === 0 ? 'One date must be selected' : ''}
                  </Typography>
                </div>
              </Grid>

              {/* <ExternalProgram /> */}
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pl: 5 }}>
                {selectedSchedules.length === 0 ? (
                  <Button variant="contained" disabled>
                    {' '}
                    Submit{' '}
                  </Button>
                ) : (
                  <Button variant="contained" type="submit">
                    {' '}
                    Submit{' '}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        </form>
        <AdvertModal
          selectedSchedules={selectedSchedules}
          setSelectedSchedules={setSelectedSchedules}
          advertPlansData={advertPlansData.data}
          modal={modal}
          setModal={setModal}
        />
      </Box>
    </div>
  );
};

export default AdvertForm;
