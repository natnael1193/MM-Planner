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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// const defaultValue = ['Oliver Hansen', 'Van Henry', 'April Tucker'];

const SpotForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  const [spotContent, setSpotContent] = React.useState<string[]>([]);
  let spotContentData: any = [];

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

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
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Alias"
                  {...register('key', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.key && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Spot Name"
                  {...register('name', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.name && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Content Type"
                  {...register('contentType', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.contentType && 'This is required'}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Content Length"
                  {...register('contentLength', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.contentLength && 'This is required'}</Typography>
              </Grid>
              {/* <Grid>
                <FormControl>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={spotContent}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    defaultValue={defaultValue}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={spotContent.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  {...register('description', { required: true })}
                  sx={{ mt: 1 }}
                />
                <Typography color="red">{errors.description && 'This is required'}</Typography>
              </Grid>
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
