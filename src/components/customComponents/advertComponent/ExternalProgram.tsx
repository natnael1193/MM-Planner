import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FirstWeekSchedules from './FirstWeekSchedules';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';
import { useExternalProgramsQuery } from 'src/services/ExternalProgramApi';

const ExternalProgram = () => {
  let externalProgramsData: any = [];
  let stationId: any = null;
  let programId: any = null;

  const { data, error, isLoading, isSuccess, isFetching } = useExternalProgramsQuery();
  //React-hook-form
  const { control, watch } = useForm();
  stationId = watch('station');
  programId = watch('program');

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    externalProgramsData = data;
  }

  if (error) return <Error />;

  //Programs Array With Their Station Id
  let newExternalProgramData: any = [];
  newExternalProgramData = externalProgramsData.map((programs: any) => {
    console.clear();
    return programs.programs.map((newPrograms: any) => {
      return {
        id: newPrograms.id,
        name: newPrograms.name,
        startDate: newPrograms.startDate,
        endDate: newPrograms.endDate,
        schedules: newPrograms.schedules,
        station_id: programs.id,
        station_name: programs.name,
      };
    });
  });

  //Merge All Programs
  let newMergedProgramData: any = [];
  newMergedProgramData = newExternalProgramData.flat();

  //Filter Programs Based On Their Stations
  let newFilteredProgramData: any = [];
  newFilteredProgramData = newMergedProgramData.filter((programs: any) => {
    console.clear();
    return programs.station_id === stationId;
  });

  return (
    <>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <FormControl fullWidth sx={{ m: 2, ml: 0, }}>
          <Controller
            render={({ field }) => (
              <div>
                <InputLabel id="demo-simple-select-label">Stations</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Stations"
                  {...field}
                  fullWidth
                  defaultValue={[]}
                >
                  {externalProgramsData?.map((stations: any) => {
                    return (
                      <MenuItem value={stations.id} key={stations.id}>
                        {stations.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            )}
            control={control}
            name="station"
            defaultValue=""
          />
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <FormControl fullWidth sx={{ m: 2, ml: 0, }}>
          <Controller
            render={({ field }) => (
              <div>
                <InputLabel id="demo-simple-select-label">Programs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Programs"
                  {...field}
                  fullWidth
                  defaultValue={[]}
                >
                  {newFilteredProgramData?.map((programs: any) => {
                    return (
                      <MenuItem value={programs.id} key={programs.id}>
                        {programs.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            )}
            control={control}
            name="program"
            defaultValue=""
          />
        </FormControl>
      </Grid>
      <Grid container sx={{ mt: 3 }} spacing={1}>
        <FirstWeekSchedules programId={programId} programData={newFilteredProgramData} />
      </Grid>
    </>
  );
};

export default ExternalProgram;
