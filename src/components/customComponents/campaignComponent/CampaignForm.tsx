import { Container, Card, Typography, Grid, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const CampaignForm = ({ formTitle, onFormSubmit, defaultValues }: any) => {
  // React-hook form
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <div>
      <Container>
        <Card sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h3">Add Campaign</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item lg={6} md={6} sm={12}>
                <TextField label="Key" fullWidth {...register('key', { required: true })} />
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  label="Campaign Name"
                  fullWidth
                  {...register('name', { required: true })}
                />
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
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ ml: 2, mt: 2 }}>
              Submit
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default CampaignForm;
