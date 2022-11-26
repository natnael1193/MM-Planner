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
  adsData,
  index,
  campaignId,
}: any) => {
  const [open, setOpen] = React.useState(false);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `adverts[${nestIndex}].ads`,
  });

  console.log('scheduleData', scheduleData)

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
                ? (setValue(`advert[${index}].adverts[${nestIndex}].day`, scheduleData?.day),
                  setValue(`advert[${index}].adverts[${nestIndex}].scheduleId`, scheduleData?.id),
                  // setValue(`adverts[${nestIndex}].adverts[${nestIndex}].campaignId`, campaignId),
                  setValue(`advert[${index}].adverts[${nestIndex}].open`, true))
                : (setValue(`advert[${index}].adverts[${nestIndex}].day`, ''),
                  setValue(`advert[${index}].adverts[${nestIndex}].scheduleId`, ''),
                  // setValue(`adverts[${nestIndex}].adverts[${nestIndex}].campaignId`, ''),
                  setValue(`advert[${index}].adverts[${nestIndex}].open`, false));
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.startTime).format('dddd')}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.startTime).format('h:mm A')}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.endTime).format('h:mm A')}
        </TableCell>
        <TableCell style={{ fontSize: '24px' }}>
          {moment.utc(scheduleData?.endTime).format('h:mm A')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Grid container spacing="5">
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 2 }}>
                  {scheduleData?.priceConfig?.priceCategory?.priceType === 'Sponsorship' ? (
                    <TextField
                      {...register(`advert[${index}].sponsoredLength` as const)}
                      label="Sponsorship Length"
                      type="number"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Sec</InputAdornment>,
                      }}
                    />
                  ) : (
                    <input hidden {...setValue(`advert[${index}].sponsoredLength`, 0)} />
                  )}
                </Grid>
              </Grid> */}

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Ads Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adsData?.data?.map((ads: any, k: any) => (
                    <TableRow key={ads.id}>
                      <TableCell>
                        <Input
                          {...register(
                            `advert[${index}].adverts[${nestIndex}].ads[${k}].adsId` as const
                          )}
                          defaultValue={ads.id}
                          type="checkbox"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {ads.name}
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Input
                          {...register(
                            `advert[${index}].adverts[${nestIndex}].ads[${k}].qut` as const
                          )}
                          defaultValue={1}
                          type="number"
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
