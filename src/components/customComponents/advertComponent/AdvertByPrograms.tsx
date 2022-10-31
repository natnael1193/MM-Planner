import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  TextField,
  Typography,
  Table,
  TableHead,
  IconButton,
  TableBody,
  Input,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import { useFieldArray } from 'react-hook-form';

const AdvertByPrograms = ({
  register,
  control,
  setValue,
  scheduleData,
  nestIndex,
  priceCategoryData,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [openSponsorshipFields, setOpenSponsorshipFields] = React.useState('');
  const [priceCategoryId, setPriceCategoryId] = React.useState('');
  // const [priceConfigs, setPriceConfigs] = React.useState([])
  let priceConfigs: any = [];
  const { fields, remove, append } = useFieldArray({
    control,
    name: `adverts[${nestIndex}].ads`,
  });

  priceConfigs = priceCategoryData?.data?.filter((priceCategory: any) => {
    return priceCategoryId === priceCategory.id;
  });
  priceConfigs = priceConfigs[0]?.priceConfigs;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              open === false
                ? (setValue(`adverts[${nestIndex}].name`, scheduleData?.day),
                  setValue(`adverts[${nestIndex}].scheduleId`, scheduleData?.id))
                : (setValue(`adverts[${nestIndex}].name`, ''),
                  setValue(`adverts[${nestIndex}].scheduleId`, ''));
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ fontSize: '24px' }}>
          {scheduleData?.day}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.startTime).format('h:mm A')}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.endTime).format('h:mm A')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing="5">
                <Grid item style={{ marginBottom: 5 }} lg={4} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ad Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Ad Type"
                      displayEmpty
                      {...register(`adverts[${nestIndex}].adType` as const)}
                      defaultValue={''}
                      required={open === true ? true : false}
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
                <Grid item style={{ marginBottom: 5 }} lg={4} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Price Category"
                      displayEmpty
                      // {...register(`adverts[${nestIndex}].adType` as const)}
                      defaultValue={''}
                      required={open === true ? true : false}
                      value={priceCategoryId}
                      onChange={(event) => {
                        setPriceCategoryId(event.target.value as string);
                      }}
                    >
                      {priceCategoryData?.data?.map((priceCategory: any) => (
                        <MenuItem value={priceCategory.id} key={priceCategory.id}>
                          {priceCategory.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item style={{ marginBottom: 5 }} lg={4} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Price Config"
                      displayEmpty
                      {...register(`adverts[${nestIndex}].priceConfigId` as const)}
                      defaultValue={''}
                      required={open === true ? true : false}
                    >
                      {priceConfigs?.map((priceConfig: any) => (
                        <MenuItem value={priceConfig.id} key={priceConfig.id}>
                          {priceConfig.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              {openSponsorshipFields === 'Sponsorship' ? (
                <Grid container spacing="10" sx={{ mb: 2, mt: 1 }}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
                    <TextField
                      {...register(`adverts[${nestIndex}].sponsorshipLength` as const)}
                      label="Sponsorship Length"
                      type="number"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Sec</InputAdornment>,
                      }}
                    />
                  </Grid>
                  {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      {...register(`adverts[${nestIndex}].sponsorshipPrice` as const)}
                      label="Sponsorship Price"
                      type="number"
                      required
                      fullWidth
                    />
                  </Grid> */}
                </Grid>
              ) : (
                <Grid container spacing="10" sx={{ pl: 2, pr: 2 }}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
                    <input hidden {...setValue(`adverts[${nestIndex}].sponsorshipLength`, 0)} />
                  </Grid>
                  {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                    <input hidden {...setValue(`adverts[${nestIndex}].sponsorshipPrice`, 0)} />
                  </Grid> */}
                </Grid>
              )}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Ads Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleData.ads.map((ads: any, k: any) => (
                    <TableRow key={ads.id}>
                      <TableCell>
                        <Input
                          {...register(`adverts[${nestIndex}].ads[${k}].adsId` as const)}
                          defaultValue={ads.id}
                          type="checkbox"
                          // required={open === true ? true : false}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {ads.name}
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Input
                          {...register(`adverts[${nestIndex}].ads[${k}].qut` as const)}
                          defaultValue={1}
                          type="number"
                          // required={open === true ? true : false}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default AdvertByPrograms;
