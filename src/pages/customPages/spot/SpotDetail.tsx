import { useParams } from 'react-router-dom';
import { useSpotQuery } from 'src/services/SpotApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import { Grid, Typography } from '@mui/material';
import SpotContentListComponent from 'src/components/customComponents/spotContentComponent/SpotContentListComponent';

const SpotDetail = () => {
  const params = useParams();
  const paramsId: any = params.spotId;
  var defaultValues: any = {};

  //Get Spot Content By Id
  const { data: spotData, error, isLoading }: any = useSpotQuery(paramsId);

  //Loading State
  if (isLoading) return <Loading />;

  // Return an error if there is an error
  if (error) return <Error />;

  //Assign the data to a variable
  defaultValues = spotData.data;

  console.log(defaultValues);

  return (
    <div>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">{defaultValues.name}</Typography>
        </Grid>
        <Grid container direction={'row'}>
          <Typography variant="inherit" sx={{ mt: 1 }}>
            {' '}
            Content Length -{' '}
          </Typography>
          <Typography variant="h3" sx={{ ml: 1 }}>
            {defaultValues.contentLength}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2}}>
          <SpotContentListComponent
            spotContentData={defaultValues.spotContents}
            dataGridTitle={'Spot Content List'}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SpotDetail;
