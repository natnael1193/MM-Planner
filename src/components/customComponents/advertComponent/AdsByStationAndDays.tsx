import { CheckBox } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Input,
  TextField,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { useExternalPriceCategoriesQuery } from 'src/services/ExternalProgramApi';
import { useSpotsQuery } from 'src/services/SpotApi';
import Checkbox from '@mui/material/Checkbox';

const AdsByStationAndDays = ({ stationId, register, errors, programs, index, setValue }: any) => {
  let priceConfigs: any = [];
  const [priceCategoryId, setPriceCategoryId] = React.useState('');
  const [checked, setChecked] = React.useState('');

  const {
    data: campaignData,
    isLoading: campaignLoading,
    error: campaignError,
  }: any = useCampaignsQuery();

  const {
    data: priceCategoryData,
    isLoading: priceCategoryLoading,
    error: priceCategoryError,
  }: any = useExternalPriceCategoriesQuery(stationId);

  const { data: spotData, isLoading: spotLoading, error: spotError }: any = useSpotsQuery();

  if (campaignLoading || priceCategoryLoading || spotLoading) return <Loading />;
  if (campaignError || priceCategoryError || spotError) return <Error />;
  priceConfigs = priceCategoryData?.data?.filter((priceCategory: any) => {
    return priceCategory.id === priceCategoryId;
  });
  priceConfigs = priceConfigs?.[0]?.priceConfigs;

  // console.log('checked', programs);
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
            {...register(`ads[${index}].ModifiedCampainId` as const)}
          >
            {campaignData?.data?.map((campaign: any) => (
              <MenuItem value={campaign.id} key={campaign.id}>
                {campaign.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
        {programs?.priceConfig?.priceCategory?.priceType === 'Sponsorship' ? (
          <TextField
            label="Sponsorship Length"
            type="number"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">Sec</InputAdornment>,
            }}
            {...register(`ads[${index}].sponsoredLength` as const)}
          />
        ) : (
          <input hidden {...setValue(`advert[${index}].sponsoredLength`, 0)} />
        )}
      </Grid> */}

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
            {spotData?.data?.map((spots: any, nestIndex: any) => {
              return (
                <TableRow key={nestIndex}>
                  <TableCell>
                    <Input
                      type="checkbox"
                      {...register(`ads[${index}].adverts[${nestIndex}].adsId` as const)}
                      defaultValue={spots.id}
                    />
                  </TableCell>
                  <TableCell>{spots.name}</TableCell>
                  <Input
                    {...register(`ads[${index}].adverts[${nestIndex}].qut` as const)}
                    defaultValue={1}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default AdsByStationAndDays;
