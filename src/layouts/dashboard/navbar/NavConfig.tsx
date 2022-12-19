// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import CampaignIcon from '@mui/icons-material/Campaign';
import AirplayIcon from '@mui/icons-material/Airplay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';
import ComputerIcon from '@mui/icons-material/Computer';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.0.0',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
      // { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
      // { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: '/dashboard/account/register',
        icon: ICONS.user,
        children: [
          { title: 'All Users', path: '/dashboard/account/alluser' },
          { title: 'Register', path: '/dashboard/account/register' },
          // { title: 'Six', path: '/dashboard/user/six' },
        ],
      },
      {
        title: 'Campaign',
        path: '/dashboard/campaign',
        icon: <CampaignIcon />,
        children: [
          { title: 'Campaign List', path: '/dashboard/campaign/list' },
          { title: 'Add Campaign', path: '/dashboard/campaign/add' },
        ],
      },
      // {
      //   title: 'Advert Plan',
      //   path: '/dashboard/advert-plan',
      //   icon: <ComputerIcon/>,
      //   children: [
      //     { title: 'Advert Plan List', path: '/dashboard/advert-plan/list' },
      //     { title: 'Add Advert Plan', path: '/dashboard/advert-plan/add' },
      //   ],
      // },
      // {
      //   title: 'Advert Schedule',
      //   path: '/dashboard/advert-schedule',
      //   icon: <ComputerIcon/>,
      //   children: [
      //     { title: 'Advert Schedule List', path: '/dashboard/advert-schedule/list' },
      //     { title: 'Add Advert Schedule', path: '/dashboard/advert-schedule/add' },
      //   ],
      // },
      {
        title: 'Advert',
        path: '/dashboard/advert',
        icon: <AirplayIcon />,
        children: [
          // { title: 'Advert List', path: '/dashboard/advert/list' },
          // { title: 'Add Advert', path: '/dashboard/advert/advert-by-spot-campaign' },
          { title: 'Add Advert By Program', path: '/dashboard/advert/add' },
          // { title: 'Add Advert By Days', path: '/dashboard/advert/advert-by-date' },
          { title: 'Add Advert By Station', path: '/dashboard/advert/advert-by-station-days' },
          // { title: 'Advert Timeline', path: '/dashboard/advert/timeline' },
          // advert-by-station-days
        ],
      },
      // {
      //   title: 'Advert Detail',
      //   path: '/dashboard/advert-detail',
      //   icon: <DetailsIcon />,
      //   children: [
      //     { title: 'Advert Detail List', path: '/dashboard/advert-detail/list' },
      //     { title: 'Add Advert Detail', path: '/dashboard/advert-detail/add' },
      //   ],
      // },
      {
        title: 'Ads',
        path: '/dashboard/spot',
        icon: <RoomIcon />,
        children: [
          { title: 'Ads List', path: '/dashboard/spot/list' },
          { title: 'Add Ads', path: '/dashboard/spot/add' },
        ],
      },
      // {
      //   title: 'spotContent',
      //   path: '/dashboard/spot-content',
      //   icon: <ContentCopyIcon />,
      //   children: [
      //     { title: 'Spot Content List', path: '/dashboard/spot-content/list' },
      //     { title: 'Add Spot Content', path: '/dashboard/spot-content/add' },
      //   ],
      // },
      // {
      //   title: 'Test',
      //   path: '/dashboard/test',
      //   icon: <CampaignIcon />,
      //   children: [
      //     { title: 'Pagination', path: '/dashboard/test/pagination' },
      //     { title: 'CollapsibleTable', path: '/dashboard/test/table-collapse' },
      //     { title: 'Field Array', path: '/dashboard/test/field-array' },
      //     //
      //   ],
      // },
    ],
  },
];

export default navConfig;
