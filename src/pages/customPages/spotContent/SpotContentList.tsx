import { Grid, CircularProgress, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
// import BreadCrumb from '../../breadCrumb/BreadCrumb';
import SpotContentListComponent
    from '../../../components/customComponents/spotContentComponent/SpotContentListComponent';


const SpotContentList = () => {
  let spotContentData: any = [];

  //Get All Spot Contents
  const { data, error, isLoading, isSuccess, isFetching } = useSpotContentsQuery();

  if(isLoading || isFetching) return(
    <Loading/>
  )

  if (isSuccess) {
    spotContentData = data;
  }

  if(error) return(
    <Error/>
  )
  return (
    <div><SpotContentListComponent spotContentData={spotContentData}/></div>
  )
}

export default SpotContentList