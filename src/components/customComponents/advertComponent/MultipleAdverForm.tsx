import {
  Button,
  Card,
  Collapse,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import {
  useExternalPriceCategoriesQuery,
  useExternalProgramsQuery,
} from 'src/services/ExternalProgramApi';
import {
  useStationsQuery,
  useProgramByStationQuery,
  useScheduleByProgramQuery,
} from 'src/services/ExternalScheduleApi';
import { useSpotsQuery } from 'src/services/SpotApi';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { Typography } from '@mui/material';
import AdvertByPrograms from './AdvertByPrograms';

type FormValues = {
  firstName: string;
  advert: {
    campaignId: string;
    programId: string;
    stationId: string;
    ads: any;
  }[];
};

const MultipleAdverForm = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  let campaignsData: any = [];
  let stationsData: any = [];
  let programsData: any = [];
  let schedulesData: any = [];
  let priceCategoryData: any = [];
  //   let stationId: any = 1;
  //   let programId: any = 1;
  const [programId, setProgramId] = React.useState('');
  const [stationId, setStationId] = React.useState('');
  const [schedules, setSchedules]: any = React.useState([]);
  let advert: any = [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      advert: [
        {
          campaignId: '',
          programId: '',
          stationId: '',
          ads: [],
        },
      ],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'advert',
    control,
  });

  //   stationId = watch('stationId');
  //   programId = watch('programId');

  advert = watch(['advert']);

  //Get All campaign
  const { data: campaign, isLoading, isFetching, isSuccess, error } = useCampaignsQuery();

  //Get All Stations
  const {
    data: station,
    isLoading: stationLoading,
    isFetching: stationFetching,
    isSuccess: stationSuccess,
    error: stationError,
  } = useStationsQuery();

  //Get Station By ID
  const {
    data: program,
    isLoading: programLoading,
    isFetching: programFetching,
    isSuccess: programSuccess,
    error: programError,
  }: any =
    //   useProgramByStationQuery(stationId);
    useExternalProgramsQuery();

  const {
    data: schedule,
    isLoading: scheduleLoading,
    isFetching: scheduleFetching,
    isSuccess: scheduleSuccess,
    error: scheduleError,
  }: any = useScheduleByProgramQuery(programId);

  const {
    data: adsData,
    isLoading: adsLoading,
    isFetching: adsFetching,
    error: adsError,
  }: any = useSpotsQuery();

  const {
    data: priceConfig,
    isLoading: priceConfigLoading,
    isFetching: priceConfigFetching,
    isSuccess: priceConfigSuccess,
    error: priceConfigError,
  }: any = useExternalPriceCategoriesQuery(stationId);

  if (
    isLoading ||
    isFetching ||
    stationLoading ||
    stationFetching ||
    programLoading ||
    scheduleLoading ||
    adsLoading ||
    adsFetching ||
    priceConfigLoading ||
    priceConfigFetching
  )
    return <Loading />;

  if (isSuccess) {
    campaignsData = campaign;
  }

  if (stationSuccess) {
    stationsData = station;
  }

  //   if (programSuccess) {
  //     programsData = program.data.programs;
  //   }

  programsData = stationsData?.data?.filter((station: any) => {
    return station.id === stationId;
  });

  programsData = programsData?.[0]?.programs;

  if (priceConfigSuccess) {
    priceCategoryData = priceConfig;
  }

  if (error || stationError || adsError) return <Error />;

  const onSubmit = (data: FormValues) => console.log(data);

  let advertPrograms: any = watch('advert');
  let advertSchedules: any = watch('advert');

  // console.log('programsData', advertPrograms);

  advertPrograms = advertPrograms.map(function (programs: any) {
    return {
      stationId: programs.stationId,
      programId: programs.programId,
      programs: program?.data,
    };
  });

  advertPrograms = advertPrograms.map(function (programs: any) {
    return {
      stationId: programs.stationId,
      programId: programs.programId,
      programs: programs?.programs.filter((prog: any) => {
        // return prog.stationId === programs.stationId;
        return prog.station.id === programs.stationId;
      }),
    };
  });

  advertSchedules = advertPrograms.map(function (schedules: any) {
    return {
      stationId: schedules.stationId,
      programId: schedules.programId,
      //   schedules: schedulesData === undefined ? [] : [...schedulesData],
      programs: schedules.programs,
      schedules: schedules?.programs?.map((schedule: any) => {
        return {
          id: schedule.id,
          schedules: schedule?.schedules?.filter((sch: any) => {
            return schedules.programId === sch.programId;
          }),
        };
      }),
    };
  });

  advertSchedules = advertSchedules.map(function (schedules: any) {
    return {
      stationId: schedules.stationId,
      programId: schedules.programId,
      programs: schedules.programs,
      schedules: schedules?.schedules?.filter((schedule: any) => {
        return schedule.schedules.length > 0;
      }),
    };
  });


  console.log('advertPrograms 2', advertPrograms);
  //   console.log('advert 1', schedulesData === undefined ? [] : [schedulesData, ...schedulesData]);
  console.log('program?.data', program);
  console.log('advert 3', advertSchedules);

  return (
    <div>
      <Card sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <Grid container spacing={2} sx={{ p: 2 }} key={field.id}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Campaign"
                      defaultValue=""
                      displayEmpty
                      {...register(`advert.${index}.campaignId` as const, {
                        required: true,
                      })}
                    >
                      {campaignsData?.data?.map((campaign: any) => {
                        return (
                          <MenuItem key={campaign.id} value={campaign.id}>
                            {campaign.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography variant="inherit" color="error">
                      {errors?.advert?.[index]?.campaignId ? 'This is required' : ''}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Station</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Station"
                      {...register(`advert.${index}.stationId` as const, {
                        required: true,
                      })}
                      defaultValue={''}
                      displayEmpty
                    >
                      {stationsData?.data?.map((station: any) => {
                        return (
                          <MenuItem
                            key={station.id}
                            value={station.id}
                            onChange={() => {
                              setStationId(station.id);
                            }}
                          >
                            {station.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography variant="inherit" color="error">
                      {errors?.advert?.[index]?.stationId ? 'This is required' : ''}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Program</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Program"
                      {...register(`advert.${index}.programId` as const, {
                        required: true,
                      })}
                      //   value={programId}
                      //   onChange={() => {
                      //     setOpen(true);
                      //   }}
                      defaultValue={''}
                      displayEmpty
                    >
                      {advertPrograms?.[index]?.programs?.map((program: any) => {
                        return (
                          <MenuItem
                            key={program.id}
                            value={program.id}
                            onClick={() => {
                              setProgramId(program.id);
                              //   setSchedules((oldArray: any) => [...oldArray, program.id]);
                              //   setMyArray(oldArray => [...oldArray, newElement]);
                            }}
                          >
                            {program.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography variant="inherit" color="error">
                      {errors?.advert?.[index]?.programId ? 'This is required' : ''}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {advertSchedules?.[index]?.schedules?.map((schedules: any) => {
                    return (
                      <Grid key={schedules.id}>
                        {/* {programId === schedules.id ? schedules.name : ''} */}
                        {schedules.id}
                        {/* {schedules?.schedules?.map((schedule: any) => {
                          return (
                            <Typography variant="inherit" key={schedule.id}>
                              {schedule.startTime}
                            </Typography>
                          );
                        })} */}
                        {/* <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>Day</TableCell>
                              <TableCell>Start Time</TableCell>
                              <TableCell>End Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {schedules?.schedules?.map((schedules: any, index: any) => {
                              return (
                                <AdvertByPrograms
                                  {...{ register, control }}
                                  scheduleData={schedules}
                                  key={schedules.id}
                                  nestIndex={index}
                                  setValue={setValue}
                                  priceCategoryData={priceCategoryData}
                                  adsData={adsData}
                                />
                              );
                            })}
                          </TableBody>
                        </Table> */}
                      </Grid>
                    );
                  })}
                </Grid>

                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{ display: { xs: 'block', lg: 'none', md: 'none' } }}
                >
                  {adsData?.data?.map((ads: any, nestedIndex: any) => {
                    return (
                      <Grid container key={ads.id} sx={{ m: 2 }}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Input
                            type="checkbox"
                            {...register(`advert.${index}.ads.${nestedIndex}.ads` as const)}
                            value={ads.id}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant="inherit">{ads.name}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Collapse>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                    disabled={watch('advert').length < 2 ? true : false}
                  >
                    DELETE
                  </Button>
                </Grid>
                {/* <Collapse>
                </Collapse> */}
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{ display: { xs: 'none', lg: 'block', md: 'block' } }}
                >
                  {adsData?.data?.map((ads: any, nestedIndex: any) => {
                    return (
                      <Grid container key={ads.id} sx={{ m: 2 }}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Input
                            type="checkbox"
                            {...register(`advert.${index}.ads.${nestedIndex}.ads` as const)}
                            value={ads.id}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant="inherit">{ads.name}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Collapse>
                <Divider />
              </Grid>
            );
          })}
          <Grid container sx={{ m: 2 }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                type="button"
                variant="contained"
                color="success"
                onClick={() =>
                  append({
                    campaignId: '',
                    stationId: '',
                    programId: '',
                    ads: [],
                  })
                }
                sx={{ m: 2, color: 'white' }}
              >
                Add Another
              </Button>
              <Button type="submit" variant="contained" sx={{ m: 2, color: 'white' }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
};

export default MultipleAdverForm;
