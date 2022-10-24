import React from 'react';
import { Grid, Box, Paper, Card, Typography, Divider } from '@mui/material';
// import MovingIcon from '@mui/icons-material/Moving';
import CampaignIcon from '@mui/icons-material/Campaign';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import SourceIcon from '@mui/icons-material/Source';
import DetailsIcon from '@mui/icons-material/Details';
import { styled } from '@mui/material/styles';
import Loading from '../shared/Loading';
import { useSpotsQuery } from 'src/services/SpotApi';
import { useCampaignsQuery } from 'src/services/CamapignApi';
import { useSpotContentsQuery } from 'src/services/SpotContentApi';
import { useAdvertsQuery } from 'src/services/AdvertApi';
import { useAdvertPlansQuery } from 'src/services/AdvertPlanApi';
import { useAdvertDetailsQuery } from 'src/services/AdvertDetailApi';
import Error from '../shared/Error';
import BarChart from './BarChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: 'start',
  // color: theme.palette.text.secondary,
  // boxShadow: "",
  // border: "black"
}));

const Dashboard = () => {
  let campaignChartData: any = [];
  let advertPlansChartData: any = [];
  let advertPlanChartData: any = [];
  let advertChartData: any = [];

  //Get All Spot Contents
  const { data: spotData, error: spotError, isLoading: spotLoading }: any = useSpotsQuery();

  //Get all campaign
  const {
    data: campaignData,
    error: campaignError,
    isLoading: campaignLoading,
  }: any = useCampaignsQuery();

  //Get All Spot Contents
  const {
    data: spotContentData,
    error: spotContentError,
    isLoading: spotContentLoading,
  }: any = useSpotContentsQuery();

  //Ger All Advert
  const { data: advertData, error: advertError, isLoading: advertLoading }: any = useAdvertsQuery();

  //Get all advert plans
  const {
    data: advertPlanData,
    error: advertPlanError,
    isLoading: advertPlanLoading,
  }: any = useAdvertPlansQuery();

  //Get All Advert Details
  const {
    data: advertDetailData,
    error: advertDetailError,
    isLoading: advertDetailLoading,
  }: any = useAdvertDetailsQuery();

  if (
    spotLoading ||
    campaignLoading ||
    spotContentLoading ||
    advertLoading ||
    advertPlanLoading ||
    advertDetailLoading
  )
    return <Loading />;

  if (
    spotError ||
    campaignError ||
    spotContentError ||
    advertError ||
    advertPlanError ||
    advertDetailError
  )
    return <Error />;

  //  Returns campaign name only
  campaignChartData = campaignData.data.map(function (campaigns: any) {
    return campaigns.name;
  });

  // Returns the number of advert plans
  advertPlansChartData = campaignData.data.map(function (advertPlans: any) {
    return advertPlans?.advertPlans?.length;
  });

  // Returns the name of advert plans
  advertPlanChartData = advertPlanData.data.map(function (advertPlans: any) {
    return advertPlans.name;
  });

  // Returns the number of adverts
  advertChartData = advertPlanData.data.map(function (adverts: any) {
    return adverts.adverts.length;
  });

console.log(advertChartData)

  return (
    <div>
      <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Campaign <CampaignIcon color="success" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{campaignData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Advert <NextPlanIcon color="secondary" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{advertData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Advert Plan <SourceIcon color="warning" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{advertPlanData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Divider />
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">Total Advert Detail</Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{advertDetailData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Spot <DetailsIcon color="error" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{spotData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Spot <DetailsIcon color="error" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{spotContentData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <Typography variant="h3">Campaign with Advert Plans</Typography>
            <BarChart
              xData={campaignChartData}
              yData={advertPlansChartData}
              label={'Advert Plans'}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <Typography variant="h3">Advert Plans with Adverts</Typography>
            <BarChart
              xData={advertPlanChartData}
              yData={advertChartData}
              label={'Adverts'}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
