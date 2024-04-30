import LineChartCore from '@/components/core/line-chart/LineChartCore';
import { Paper } from '@mui/material';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import AccordionCore from '../../../components/core/accordion/AccordionCore';
import PieChartCore from '../../../components/core/pie-chart/PieChart';
import StorageStatistic from '../shared/StorageStatistic';
import DashBoardRate from './components/DashBoardRate';
import RecentlyAddedUsers from './components/RecentlyAddedUsers';
import StorageLog from './components/StorageLog';
import { Card } from 'antd';
import DashboardCard from './components/DashboardCard';

const DashBoard = () => {
  return (
    <div className='h-full w-full lg:flex  lg:overflow-hidden'>
      <div className='w-full overflow-y-auto lg:max-h-screen lg:w-3/4 '>
        <div className='flex w-full flex-col'>
          <div className='max-w-pc  w-full'>
            <div className='m-5 flex gap-6'>
              <DashboardCard data={{ name: 'Total users', percentage: 1.05, value: 300 }} />
              <DashboardCard data={{ name: 'Active users', percentage: -1.05, value: 260 }} />
              <DashboardCard data={{ name: 'Blocked users', percentage: 0, value: 40 }} />
            </div>
          </div>
          <div className='flex w-full flex-col gap-6'>
            <Card className='m-5'>
              <LineChartCore
                data={[
                  {
                    name: 'Visited users',
                    data: [10, 20, 70, 50, 20, 80, 35, 60, 70, 100, 110, 120],
                  },
                  {
                    name: 'Active users',
                    data: [14, 45, 23, 45, 67, 23, 45, 67, 23, 45, 67, 23],
                  },
                ]}
                categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                title='User Activity'
              />
            </Card>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div className='w-full sm:p-2'>
            <StorageStatistic />
          </div>
          <div className='w-full sm:p-2'>
            <div className='mx-5 flex gap-6 rounded-lg border border-gray-50 bg-white'>
              <PieChartCore
                data={[
                  { value: 10, label: 'Used' },
                  { value: 20, label: 'Free' },
                ]}
              />

              <PieChartCore
                data={[
                  { value: 10, label: 'Document' },
                  { value: 20, label: 'Iamge' },
                  { value: 10, label: 'zip' },
                  { value: 20, label: 'Another' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-5 h-12 bg-green-300 lg:w-1/4'>
        <RecentlyAddedUsers />
        <StorageLog />
      </div>
    </div>
  );
};

export default DashBoard;
