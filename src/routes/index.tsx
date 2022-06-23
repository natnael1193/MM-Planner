import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

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
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/one" replace />, index: true },
        { path: '/dashboard', element: <Navigate to="/dashboard/one" replace />, index: true },
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
          path: '/dashboard/advert',
          children: [
            { element: <Navigate to="/dashboard/advert/list" replace />, index: true },
            { path: '/dashboard/advert/list', element: <AdvertList /> },
            { path: '/dashboard/advert/add', element: <AddAdvert /> },
            { path: '/dashboard/advert/edit/:advertId', element: <EditAdvert /> },
          ],
        },
        {
          path: '/dashboard/advert-detail',
          children: [
            { element: <Navigate to="/dashboard/advert-detail/list" replace />, index: true },
            { path: '/dashboard/advert-detail/list', element: <AdvertDetailList /> },
            { path: '/dashboard/advert-detail/add', element: <AddAdvertDetail /> },
            { path: '/dashboard/advert-detail/edit/:advertDetailId', element: <EditAdvertDetail /> },
          ],
        },
        {
          path: '/dashboard/spot',
          children: [
            { element: <Navigate to="/dashboard/spot/list" replace />, index: true },
            { path: '/dashboard/spot/list', element: <SpotList /> },
            { path: '/dashboard/spot/add', element: <AddSpot /> },
            { path: '/dashboard/spot/edit/:spotId', element: <EditSpot /> },
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
const AdvertList = Loadable(
  lazy(() => import('../pages/customPages/advert/AdvertList'))
);
const AddAdvert = Loadable(
  lazy(() => import('../pages/customPages/advert/AddAdvert'))
);
const EditAdvert = Loadable(
  lazy(() => import('../pages/customPages/advert/EditAdvert'))
);