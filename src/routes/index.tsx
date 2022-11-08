import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const token = localStorage.getItem('login_token');

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const navigate = useNavigate();
  if (!token) {
    useEffect(() => {
      return navigate('/login');
    });
  }

  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace />, index: true },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/dashboard/one', element: <PageOne /> },
        { path: '/dashboard/two', element: <PageTwo /> },
        { path: '/dashboard/three', element: <PageThree /> },
        {
          path: '/dashboard/user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: '/dashboard/user/four', element: <PageFour /> },
            { path: '/dashboard/user/five', element: <PageFive /> },
            { path: '/dashboard/user/six', element: <PageSix /> },
          ],
        },
        {
          path: '/dashboard/advert-plan',
          children: [
            { element: <Navigate to="/dashboard/advert/list" replace />, index: true },
            { path: '/dashboard/advert-plan/list', element: <AdvertPlanList /> },
            { path: '/dashboard/advert-plan/add', element: <AddAdvertPlan /> },
            { path: '/dashboard/advert-plan/edit/:advertPlanId', element: <EditAdvertPlan /> },
            { path: '/dashboard/advert-plan/detail/:advertPlanId', element: <AdvertPlanDetail /> },
          ],
        },
        {
          path: '/dashboard/advert-schedule',
          children: [
            { element: <Navigate to="/dashboard/advert/list" replace />, index: true },
            { path: '/dashboard/advert-schedule/list', element: <AdvertScheduleList /> },
            { path: '/dashboard/advert-schedule/add', element: <AddAdvertSchedule /> },
            {
              path: '/dashboard/advert-schedule/edit/:advertScheduleId',
              element: <EditAdvertSchedule />,
            },
          ],
        },
        {
          path: '/dashboard/advert',
          children: [
            { element: <Navigate to="/dashboard/advert/list" replace />, index: true },
            { path: '/dashboard/advert/list', element: <AdvertList /> },
            { path: '/dashboard/advert/add', element: <AddAdvert /> },
            { path: '/dashboard/advert/edit/:advertId', element: <EditAdvert /> },
            { path: '/dashboard/advert/detail/:advertId', element: <AdvertDetail /> },
            { path: '/dashboard/advert/timeline', element: <AdvertTimeline /> },
            { path: '/dashboard/advert/advert-by-date', element: <AdvertByDate /> },
            {
              path: '/dashboard/advert/advert-by-station-days',
              element: <AdvertByStationAndDays />,
            },
            {
              path: '/dashboard/advert/advert-by-station-days-detail/:stationId',
              element: <AdvertByStationAndDaysDetail />,
            },
          ],
        },
        {
          path: '/dashboard/advert-detail',
          children: [
            { element: <Navigate to="/dashboard/advert-detail/list" replace />, index: true },
            { path: '/dashboard/advert-detail/list', element: <AdvertDetailList /> },
            { path: '/dashboard/advert-detail/add', element: <AddAdvertDetail /> },
            {
              path: '/dashboard/advert-detail/edit/:advertDetailId',
              element: <EditAdvertDetail />,
            },
          ],
        },
        {
          path: '/dashboard/spot',
          children: [
            { element: <Navigate to="/dashboard/spot/list" replace />, index: true },
            { path: '/dashboard/spot/list', element: <SpotList /> },
            { path: '/dashboard/spot/add', element: <AddSpot /> },
            { path: '/dashboard/spot/edit/:spotId', element: <EditSpot /> },
            { path: '/dashboard/spot/detail/:spotId', element: <SpotDetail /> },
          ],
        },
        {
          path: '/dashboard/spot-content',
          children: [
            { element: <Navigate to="/dashboard/spot-content/list" replace />, index: true },
            { path: '/dashboard/spot-content/list', element: <SpotContentList /> },
            { path: '/dashboard/spot-content/add', element: <AddSpotContent /> },
            { path: '/dashboard/spot-content/edit/:spotContentId', element: <EditSpotContent /> },
          ],
        },
        {
          path: '/dashboard/campaign',
          children: [
            { element: <Navigate to="/dashboard/campaign/list" replace />, index: true },
            { path: '/dashboard/campaign/list', element: <CampaignList /> },
            { path: '/dashboard/campaign/add', element: <AddCampaign /> },
            { path: '/dashboard/campaign/edit/:campaignId', element: <EditCampaign /> },
            { path: '/dashboard/campaign/detail/:campaignId', element: <CampaignDetail /> },
          ],
        },
        {
          path: '/dashboard/test',
          children: [
            { element: <Navigate to="/dashboard/test/pagination" replace />, index: true },
            { path: '/dashboard/test/pagination', element: <Pagination /> },
            { path: '/dashboard/test/table-collapse', element: <CollapsibleTable /> },
            { path: '/dashboard/test/field-array', element: <FieldArray /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/customPages/dashboard/Dashboard')));

const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

//Spot Content
const SpotContentList = Loadable(
  lazy(() => import('../pages/customPages/spotContent/SpotContentList'))
);
const AddSpotContent = Loadable(
  lazy(() => import('../pages/customPages/spotContent/AddSpotContent'))
);
const EditSpotContent = Loadable(
  lazy(() => import('../pages/customPages/spotContent/EditSpotContent'))
);

//Spot
const SpotList = Loadable(lazy(() => import('../pages/customPages/spot/SpotList')));
const AddSpot = Loadable(lazy(() => import('../pages/customPages/spot/AddSpot')));
const EditSpot = Loadable(lazy(() => import('../pages/customPages/spot/EditSpot')));
const SpotDetail = Loadable(lazy(() => import('../pages/customPages/spot/SpotDetail')));

//Advert Detail
const AdvertDetailList = Loadable(
  lazy(() => import('../pages/customPages/advertDetail/AdvertDetailList'))
);
const AddAdvertDetail = Loadable(
  lazy(() => import('../pages/customPages/advertDetail/AddAdvertDetail'))
);
const EditAdvertDetail = Loadable(
  lazy(() => import('../pages/customPages/advertDetail/EditAdvertDetail'))
);

//Advert
const AdvertList = Loadable(lazy(() => import('../pages/customPages/advert/AdvertList')));
const AddAdvert = Loadable(lazy(() => import('../pages/customPages/advert/AddAdvert')));
const EditAdvert = Loadable(lazy(() => import('../pages/customPages/advert/EditAdvert')));
const AdvertDetail = Loadable(lazy(() => import('../pages/customPages/advert/AdvertDetail')));
const AdvertTimeline = Loadable(lazy(() => import('../pages/customPages/advert/AdvertTimeline')));
const AdvertByDate = Loadable(lazy(() => import('../pages/customPages/advert/AdvertByDays')));
const AdvertByStationAndDays = Loadable(
  lazy(() => import('../pages/customPages/advert/AdvertByStationAndDays'))
);
const AdvertByStationAndDaysDetail = Loadable(
  lazy(() => import('../pages/customPages/advert/AdvertByStationAndDaysDetail'))
);

//Advert Plan
const AddAdvertPlan = Loadable(lazy(() => import('../pages/customPages/advertPlan/AddAdvertPlan')));
const EditAdvertPlan = Loadable(
  lazy(() => import('../pages/customPages/advertPlan/EditAdvertPlan'))
);
const AdvertPlanList = Loadable(
  lazy(() => import('../pages/customPages/advertPlan/AdvertPlanList'))
);
const AdvertPlanDetail = Loadable(
  lazy(() => import('../pages/customPages/advertPlan/AdvertPlanDetail'))
);

//Campaign
const CampaignList = Loadable(lazy(() => import('../pages/customPages/campaign/CampaignList')));
const AddCampaign = Loadable(lazy(() => import('../pages/customPages/campaign/AddCampaign')));
const EditCampaign = Loadable(lazy(() => import('../pages/customPages/campaign/EditCampaign')));
const CampaignDetail = Loadable(lazy(() => import('../pages/customPages/campaign/CampaignDetail')));

// Advert Schedule
const AdvertScheduleList = Loadable(
  lazy(() => import('../pages/customPages/advertSchedule/AdvertScheduleList'))
);
const AddAdvertSchedule = Loadable(
  lazy(() => import('../pages/customPages/advertSchedule/AddAdvertSchedule'))
);
const EditAdvertSchedule = Loadable(
  lazy(() => import('../pages/customPages/advertSchedule/EditAdvertSchedule'))
);

// Test
const Pagination = Loadable(lazy(() => import('../pages/customPages/test/pagination')));
// CollapsibleTable
const CollapsibleTable = Loadable(lazy(() => import('../pages/customPages/test/CollapsibleTable')));
// FieldArray
const FieldArray = Loadable(lazy(() => import('../pages/customPages/test/FieldArray')));
