import { Grid, CircularProgress, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import SpotContentListComponent from '../../../components/customComponents/spotContentComponent/SpotContentListComponent';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const SpotContentList = () => {
  let spotContentData: any = [];

  //Get All Spot Contents
  const { data, error, isLoading, isSuccess, isFetching } = useSpotContentsQuery();

  if (isLoading || isFetching) return <Loading />;

  if (isSuccess) {
    spotContentData = data;
  }

  if (error) return <Error />;
  return (
    <>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Spot Content'}
        child={'List'}
        parentLink={'/dashboard/spot-content/list'}
      />
      <SpotContentListComponent
        spotContentData={spotContentData.data}
        dataGridTitle={'Spot Content List'}
      />
    </>
  );
};

export default SpotContentList;
