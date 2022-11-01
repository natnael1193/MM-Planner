import { Card, Typography, Grid, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const CampaignForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  // React-hook form
  const { register, handleSubmit, formState: { errors} } = useForm({
    defaultValues,
  });

  return (
    <div>
      <Grid>
        <Card sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h3">{formTitle}</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item lg={6} md={6} sm={12}>
                <TextField label="Alias" fullWidth {...register('key', { required: true })} />
                <Typography color="red">{ errors.key && "This is required"}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  label="Campaign Name"
                  fullWidth
                  {...register('name', { required: true })}
                />
                <Typography color="red">{ errors.name && "This is required"}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  label="Start Date"
                  inputProps={{ step: 1 }}
                  fullWidth
                  {...register('startDate', { required: true })}
                />
                    <Typography color="red">{ errors.startDate && "This is required"}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  label="End Date"
                  inputProps={{ step: 1 }}
                  fullWidth
                  {...register('endDate', { required: true })}
                />
                    <Typography color="red">{ errors.endDate && "This is required"}</Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <TextField
                  label="Description"
                  fullWidth
                  {...register('description', { required: true })}
                />
                    <Typography color="red">{ errors.description && "This is required"}</Typography>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ ml: 2, mt: 2 }}>
              Submit
            </Button>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default CampaignForm;
