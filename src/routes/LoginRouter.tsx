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



export default function LoginRouter() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to="/login" replace />, index: true },
        { path: '/login', element: <Login /> },

      ],
    },
  ])
}


// Authentication
const Login = Loadable(lazy(() => import('../pages/customPages/auth/Login')))

