import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'src/pages/customPages/shared/Loading';
import Error from 'src/pages/customPages/shared/Error';
import { useSpotsQuery } from 'src/services/SpotApi';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';

const AdvertDetailForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  const [contentType, setContentType] = React.useState('');
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

  const handleContentTypeChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value as string);
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

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl sx={{ mt: 1, width: '100%' }}>
                  <InputLabel id="demo-simple-select-label">Content Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register('contentType')}
                    fullWidth
                    // value={contentType}
                    label="Content Type"
                    onChange={handleContentTypeChange}
                    defaultValue={defaultValues.contentType !== undefined ? defaultValues.contentType : ''}
                  >
                    <MenuItem value={'AUDIO'}>AUDIO</MenuItem>
                    <MenuItem value={'VIDEO'}>VIDEO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Content Length"
                  {...register('contentLength')}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {/* <TextField fullWidth label="Spot Contents" {...register('spotContentIds')} /> */}
                <FormControl sx={{ mt: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Spot Contents</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    label="Spot Contents"
                    id="demo-multiple-checkbox"
                    {...register('spotContentIds')}
                    fullWidth
                    multiple
                    // value={defaultValues.spotContentIds}
                    onChange={handleChange}
                    input={<OutlinedInput label="Spot Contents" />}
                    renderValue={(selected) =>
                      selected.map((obj: any) => spotContentData[obj - 1].value).join(', ')
                    }
                    defaultValue={
                      defaultValues.spotContentIds !== undefined ? defaultValues.spotContentIds : []
                    }
                    // MenuProps={MenuProps}
                  >
                    {spotContentData.map((name: any) => (
                      <MenuItem key={name.id} value={name.id}>
                        <Checkbox checked={spotContent.indexOf(name.id) > -1} />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
                <TextField label="Quantity" {...register('quantity')} type={'number'} fullWidth />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button variant="contained" type="submit">
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

export default AdvertDetailForm;
