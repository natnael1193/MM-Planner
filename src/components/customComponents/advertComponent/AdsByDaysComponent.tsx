import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  Grid,
  TableCell,
  Input,
  Collapse,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  InputAdornment,
} from '@mui/material';

const AdsByDaysComponent = ({
  nestIndex,
  control,
  register,
  item,
  isChecked,
  isCheckAll,
  priceCateogryData,
  campaignData,
}: any) => {
  
  const [openSponsorshipFields, setOpenSponsorshipFields] = useState('');
  const [priceCategoryId, setPriceCategoryId] = useState('');
  const [campaignId, setCampaignId] = useState('');
  let filteredPriceCategory: any = [];
  let priceConfigData: any = [];
  
  // const { fields, remove, append } = useFieldArray({
  //   control,
  //   name: `adverts[${nestIndex}].ads`,
  // });


  filteredPriceCategory = priceCateogryData?.filter((priceCategory: any) => {
    return priceCategory.priceType === openSponsorshipFields;
  });

  priceConfigData = filteredPriceCategory?.filter((priceCategory: any) => {
    return priceCategory.id === priceCategoryId;
  });

  priceConfigData = priceConfigData?.[0]?.priceConfigs;

  // console.log('campaignData', campaignData.data);
  
  return (
    <div>
      <Collapse in={isChecked || isCheckAll}>
        <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Campaign</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Campaign"
                displayEmpty
                {...register(`adverts[${nestIndex}].ModifiedCampainId` as const)}
                defaultValue={''}
                required={isChecked === true ? true : false}
                value={campaignId}
                onChange={(event: any) => {
                  setCampaignId(event.target.value as string);
                }}
              >
               {campaignData?.data?.map((campaings: any) => (
                  <MenuItem value={campaings.id} key={campaings.id}>
                    {campaings.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ad Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ad Type"
                displayEmpty
                {...register(`adverts[${nestIndex}].adType` as const)}
                defaultValue={''}
                required={isChecked === true ? true : false}
                value={openSponsorshipFields}
                onChange={(event: any) => {
                  setOpenSponsorshipFields(event.target.value as string);
                }}
              >
                <MenuItem value={'Spot'}>Spot</MenuItem>
                <MenuItem value={'Sponsorship'}>Sponsorship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Price Category"
                displayEmpty
                {...register(`adverts[${nestIndex}].adType` as const)}
                defaultValue={''}
                required={isChecked === true ? true : false}
                value={priceCategoryId}
                onChange={(event: any) => {
                  setPriceCategoryId(event.target.value as string);
                }}
              >
                {filteredPriceCategory?.map((priceCategory: any) => (
                  <MenuItem value={priceCategory.id} key={priceCategory.id}>
                    {priceCategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Price Config"
                displayEmpty
                {...register(`adverts[${nestIndex}].priceConfigId` as const)}
                defaultValue={''}
                required={isChecked === true ? true : false}
              >
                {priceConfigData?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

      </Collapse>
      <Collapse in={isChecked || isCheckAll}>

        <TableContainer sx={{ mt: 2, ml: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ads Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          {item.map((item: any, k: any) => {
            return (
              <TableBody key={k}>
                <TableRow>
                  <TableCell>
                    <Input
                      {...register(`adverts[${nestIndex}].ads[${k}].adsId` as const)}
                      defaultValue={item.id}
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {' '}
                    <Input
                      {...register(`adverts[${nestIndex}].ads[${k}].qut` as const)}
                      defaultValue={1}
                      type="number"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </TableContainer>
      </Collapse>
      {/* kkk */}
    </div>
  );
};

export default AdsByDaysComponent;
