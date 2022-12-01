import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { useAdvertPricesQuery } from 'src/services/AdvertApi';

const EditAdvertPrice = ({ defaultValues, priceConfigsData }: any) => {
  const programId: any = defaultValues?.programId;
  const { data, isLoading, isFetching, isError }: any = useAdvertPricesQuery(programId);
//   const { register, handleSubmit, formState: { errors }} =   


  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  console.log(defaultValues);
  return (
    <form>
      <Grid container spacing={2} sx={{ mt: 2, ml: 3 }}>
        {data?.data?.map((adverts: any) => {
          return (
            <Grid container sx={{ p: 3 }} key={adverts.id}>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Typography variant="h4">
                  {moment.utc(adverts.schedule.startTime).format('dddd')}
                </Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={Price Config}
                    label="Price Config"
                    defaultValue={adverts.priceConfigId}
                    // onChange={handleChange}
                  >
                    {priceConfigsData?.map((priceConfigs: any) => {
                      return (
                        <MenuItem value={priceConfigs.id} key={priceConfigs.id}>
                          {priceConfigs.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          );
        })}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditAdvertPrice;
