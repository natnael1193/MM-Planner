import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';


const SpotForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  const [spotContent, setSpotContent] = React.useState<string[]>([]);
  let spotContentData: any = [];

  //Spot Content Data
  const { data, isLoading, error, isSuccess } = useSpotContentsQuery();

  const handleChange = (event: SelectChangeEvent<typeof spotContent>) => {
    const {
      target: { value },
    } = event;
    setSpotContent(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  //React-hook-form
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (isLoading) return <Loading />;

  if (isSuccess) {
    spotContentData = data?.map(function (spotContents: any) {
      return {
        id: spotContents.id,
        name: spotContents.name,
        value: spotContents.name,
      };
    });
  }

  if (error) return <Error />;

  // console.log(spotContentData);
  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Spot Name"
                  {...register('name')}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Content Type"
                  {...register('contentType')}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Content Length"
                  {...register('contentLength')}
                  sx={{ mt: 1 }}
                />
              </Grid>
              {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Spot Contents</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    label="Spot Contents"
                    id="demo-multiple-checkbox"
                    {...register('spotContentIds')}
                    fullWidth
                    multiple
                    onChange={handleChange}
                    input={<OutlinedInput label="Spot Contents" />}
                    renderValue={(selected) =>
                      selected.map((obj: any) => spotContentData[obj - 1].value).join(', ')
                    }
                    defaultValue={
                      defaultValues.spotContentIds !== undefined ? defaultValues.spotContentIds : []
                    }
                  >
                    {spotContentData.map((name: any) => (
                      <MenuItem key={name.id} value={name.id}>
                        <Checkbox checked={spotContent.indexOf(name.id) > -1} />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default SpotForm;
