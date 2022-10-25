import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableCheckBox from 'src/components/customComponents/test/TableCheckBox';
import {
  Button,
  CircularProgress,
  Grid,
  Card,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import AdvertByDaysComponent from 'src/components/customComponents/advertComponent/AdvertByDaysComponent';
import ProgramsByDays from 'src/components/customComponents/externalPrograms/ProgramsByDays';
import { useExternalProgramsByDaysQuery } from 'src/services/ExternalProgramApi';
import { useSpotsQuery } from 'src/services/SpotApi';
import { useForm } from 'react-hook-form';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import { useAddMultipleAdvertMutation } from 'src/services/AdvertApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const AdvertByDays = () => {
  const navigate = useNavigate()
  const [activeDate, setActiveDate] = React.useState('Monday');
  const [isCheck, setIsCheck]: any = React.useState([]);
  const [isCheckAll, setIsCheckAll]: any = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isSelected, setIsSelected]: any = React.useState({
    name: '',
    ads: [],
  });
  var programDataByDate: any = [];
  var newProgramData: any = [];
  var spotData: any = [];
  var campaignData: any = [];
  let defaultValues: any = {};

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });

  //Get all campaign
  const {
    data: campaign,
    error: campaignError,
    isLoading: campaignLoading,
    isFetching: campaignFetching,
    isSuccess: campaignSuccess,
  } = useCampaignsQuery();

  //Get Spots
  const {
    data: spot,
    error: spotError,
    isSuccess: spotSuccess,
    isLoading: spotLoading,
    isFetching: spotFetching,
  } = useSpotsQuery();

  //Get Program By Dates
  const {
    data: programByDate,
    error: programByDateError,
    isSuccess: programByDateSuccess,
    isLoading: programByDateLoading,
    isFetching: programByDateFetching,
  } = useExternalProgramsByDaysQuery(activeDate);

  const [addAdvert, result] = useAddMultipleAdvertMutation();

  if (
    programByDateLoading ||
    programByDateFetching ||
    spotLoading ||
    spotFetching ||
    campaignLoading ||
    campaignFetching
  )
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (programByDateSuccess) {
    programDataByDate = programByDate;
  }

  if (spotSuccess) {
    spotData = spot;
  }

  if (campaignSuccess) {
    campaignData = campaign;
  }

  if (programByDateError || spotError)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  newProgramData = programDataByDate.data.programs.map(function (program: any) {
    return {
      id: program.program.id,
      name: program.program.name,
      programType: program.program.programType,
      isActive: program.program.isActive,
      ads: spotData.data,
      startTime: program.startTime,
      endTime: program.endTime,
      schedules: program.program.schedules,
      scheduleId:  program.id,
      // station: program.station.name,
    };
  });

  defaultValues = {
    adverts: newProgramData,
  };

  //Selected Data
  const handleClick = (e: { target: { id: any; checked: any } }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== id));
    }
  };

  // Selected ads checkboxes
  const handleSelectClick = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    setIsSelected({ name: isCheck, ads: [...isSelected.ads, name] });
    if (!checked) {
      setIsSelected({ name: isCheck, ads: isSelected.ads.filter((item: any) => item !== name) });
    }
  };

  //Select All Checkboxes
  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);
    setOpen(!open);

    setIsCheck(newProgramData.map((li: { id: any }) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // console.log('campaignData', campaignData.data);

  if (result.isSuccess) {
    navigate('/dashboard/advert/list');
  }
  if (result.isError) { toast.error('Something went wrong, please check all fields are filled');}


  const onSubmit = (data: any) => {
    // console.log(data)
    const newData = data.adverts.map(function (advert: any) {
      return {
        // day: activeDate,
        name: advert?.name,
        scheduleId: advert?.scheduleId,
        campainId: data.campaignId,
        advertType: advert?.adType,
        ads: advert.ads?.filter((element: any) => {
          return element.field !== false;
        }),
      };
    });

    var filteredData: any = newData.filter((adverts: any) => {
      return adverts.name !== undefined && adverts.name !== '';
    });

    filteredData = filteredData.map(function (advert: any) {
      return {
        // day: activeDate,
        // name: advert?.name,
        scheduleId: advert?.scheduleId,
        campainId: data.campaignId,
        advertType: advert?.advertType,
        adverts: advert.ads?.filter((element: any) => {
          return element.adsId !== false;
        }),
      };
    });
    addAdvert({ ads: filteredData });
    console.log(filteredData);
  };
  console.log('isCheck', programDataByDate);
  return (
    <React.Fragment>
      <Card>
        <Typography variant="h3" sx={{ m: 2 }}>
          Add Advert
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProgramsByDays
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            setIsCheck={setIsCheck}
          />
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '25%' }}>
                    {' '}
                    {/* <TableCheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                    disabled
                    onClick={() => {
                      setOpen(true);
                    }}
                  /> */}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Campaign"
                        defaultValue=""
                        displayEmpty
                        required
                        {...register('campaignId')}
                      >
                        {campaignData.data?.map((campaigns: any) => {
                          return (
                            <MenuItem value={campaigns.id} key={campaigns.id}>
                              {campaigns.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>Program Name</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Station</TableCell>
                  <TableCell>Program Type</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {defaultValues.adverts.map((row: any, index: any) => {
                  return (
                    <AdvertByDaysComponent
                      {...{ control, register, defaultValues, getValues, setValue, errors }}
                      defaultValues={defaultValues.adverts}
                      handleSelectAll={handleSelectAll}
                      isCheck={isCheck}
                      setIsCheck={setIsCheck}
                      isCheckAll={isCheckAll}
                      setIsCheckAll={setIsCheckAll}
                      handleClick={handleClick}
                      isSelected={isSelected}
                      handleSelectClick={handleSelectClick}
                      setOpen={setOpen}
                      row={row}
                      index={index}
                      key={index}
                      newProgramData={newProgramData}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid sx={{ ml: 4, mt: 2, mb: 2 }}>
            <Button type="submit" variant="contained">
              {result.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Grid>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AdvertByDays;
