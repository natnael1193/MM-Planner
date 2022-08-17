// components
import SvgIconStyle from '../../../components/SvgIconStyle';

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
  // {
  //   subheader: 'general v3.0.0',
  //   items: [
  //     { title: 'One', path: '/dashboard/one', icon: ICONS.dashboard },
  //     { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
  //     { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // {
      //   title: 'user',
      //   path: '/dashboard/user',
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: '/dashboard/user/four' },
      //     { title: 'Five', path: '/dashboard/user/five' },
      //     { title: 'Six', path: '/dashboard/user/six' },
      //   ],
      // },
      {
        title: 'Advert Plan',
        path: '/dashboard/advert-plan',
        icon: ICONS.user,
        children: [
          // { title: 'Advert List', path: '/dashboard/advert/list' },
          { title: 'Add Advert Plan', path: '/dashboard/advert-plan/add' },
        ],
      },
      {
        title: 'Advert',
        path: '/dashboard/advert',
        icon: ICONS.user,
        children: [
          { title: 'Advert List', path: '/dashboard/advert/list' },
          { title: 'Add Advert', path: '/dashboard/advert/add' },
        ],
      },
      {
        title: 'Advert Detail',
        path: '/dashboard/advert-detail',
        icon: ICONS.user,
        children: [
          { title: 'Advert Detail List', path: '/dashboard/advert-detail/list' },
          { title: 'Add Advert Detail', path: '/dashboard/advert-detail/add' },
        ],
      },
      {
        title: 'spot',
        path: '/dashboard/spot',
        icon: ICONS.user,
        children: [
          { title: 'Spot List', path: '/dashboard/spot/list' },
          { title: 'Add Spot', path: '/dashboard/spot/add' },
        ],
      },
      {
        title: 'spotContent',
        path: '/dashboard/spot-content',
        icon: ICONS.user,
        children: [
          { title: 'Spot Content List', path: '/dashboard/spot-content/list' },
          { title: 'Add Spot Content', path: '/dashboard/spot-content/add' },
        ],
      },
      {
        title: 'Campaign',
        path: '/dashboard/campaign',
        icon: ICONS.user,
        children: [
          { title: 'Campaign List', path: '/dashboard/campaign/list' },
          { title: 'Add Campaign', path: '/dashboard/campaign/add' },
        ],
      },
    ],
  },
];

export default navConfig;
