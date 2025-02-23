import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);
export const navData = [
  {
    title: 'تقراير',
    path: '/',
    icon: icon('ic-analytics'),
  },
  
  {
    title: 'البيانات الأساسية',
    path: '/sector',
    icon: icon('ic-user'),
    children: [
      {
        title: 'القطاع',
        path: '/sector',
      },
      {
        title: 'المنطقة',
        path: '/area',
      },
      {
        title: 'السنترال',
        path: '/central',
      },
    ],
  },
  {
    title: 'البيانات الفنية',
    path: '/tech',
    icon: icon('ic-lock'),
  },
  {
    title: 'وصف الاعطال',
    path: '/tech-view',
    icon: icon('ic-user'),
  },
];

