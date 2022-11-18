import {
  Button,
  Card,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';
import { useProgramByStationQuery } from 'src/services/ExternalScheduleApi';
import moment from 'moment';
import { useSpotsQuery } from 'src/services/SpotApi';
import AdsBySpotAndCampaignComponent from './AdsBySpotAndCampaignComponent';

const AdvertBySpotCampaignComponent = ({ campaignData, stationData }: any) => {
  // let stationId: any = '1';
  const [stationId, setStationId] = React.useState('');
  const [adTypeClicked, setAdTypeClicked] = React.useState('');

  // let checked: any = [];
  // const [ ]
  let programsData: any = React.useState([]);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  // stationId = watch('stationId');

  const { data: adsData, isLoading: adsLoaidng, error: adsError }: any = useSpotsQuery();

  if (adsLoaidng) return <Loading />;
  if (adsError) return <Error />;

  programsData = stationData?.filter((station: any) => {
    return station.id === stationId;
  });

  programsData = programsData?.[0]?.programs;

  console.log(programsData);

  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Station</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Station"
                {...register('stationId')}
                displayEmpty
                defaultValue={''}
                value={stationId}
                onChange={(e: any) => {
                  setStationId(e.target.value);
                }}
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
              >
                {stationData?.map((stations: any) => (
                  <MenuItem value={stations.id} key={stations.id}>
                    {stations.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Campaign"
                displayEmpty
                defaultValue={''}
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
              >
                {campaignData?.map((campaings: any) => (
                  <MenuItem value={campaings.id} key={campaings.id}>
                    {campaings.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Advert Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Advert Type"
                displayEmpty
                defaultValue={''}
                value={adTypeClicked}
                // {...register(`ads[${index}].ModifiedCampainId` as const)}
                onChange={(e: any) => {
                  setAdTypeClicked(e.target.value);
                }}
              >
                <MenuItem value="Spot">Spot</MenuItem>
                <MenuItem value="Sponsorship">Sponsorship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 5, mt: 2 }}>
        <Grid container>
          {programsData?.map((programs: any, index: any) => {
            return (
              <AdsBySpotAndCampaignComponent key={programs.id} programs={programs} index={index} {...{ register,
                adsData,
                adTypeClicked,}} />
            );
          })}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Card>
    </div>
  );
};

export default AdvertBySpotCampaignComponent;
