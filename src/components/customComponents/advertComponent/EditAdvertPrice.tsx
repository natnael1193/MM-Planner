import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Error from 'src/pages/customPages/shared/Error';
import Loading from 'src/pages/customPages/shared/Loading';
import { useAdvertPricesQuery, useUpdateAdvertPricesMutation } from 'src/services/AdvertApi';

const EditAdvertPrice = ({
  defaultValues,
  priceConfigsData,
  priceData,
  priceLoading,
  priceFetching,
  priceError,
}: any) => {
  const [updateAdvertPrices, result] = useUpdateAdvertPricesMutation();
  const response: any = result;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success('Updated Successfully');
      reset();
    }
    if (response.isError) {
      toast.error('Error ' + response.error.data.error);
    }
  }, [response]);

  if (priceLoading || priceFetching) return <Loading />;
  if (priceError) return <Error />;

  const onSubmit = (data: any) => {
    console.log(data);
    const newData: any = {
      programId: defaultValues.programId,
      modifiedCampainId: defaultValues.modifiedCampainId,
      priceConfigs: data.priceConfigs,
    };
    console.log(newData);
    updateAdvertPrices(newData);
  };

  console.log(priceData);
  //   console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ mt: 2, ml: 3 }}>
        {priceData?.data?.map((adverts: any, index: any) => {
          return (
            <Grid container sx={{ p: 3 }} key={adverts.id}>
              <Input
                type="hidden"
                {...setValue(
                  `priceConfigs.${index}.day`,
                  moment.utc(adverts.schedule.startTime).format('dddd').toLowerCase()
                )}
              />
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
                    {...register(`priceConfigs.${index}.priceConfigId`)}
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
