import { Paper } from '@mui/material';
import PieChartCore from '../../../components/core/pie-chart/PieChart';
import RecentlyAddedUsers from './dashboard-user/RecentlyAddedUsers';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import DashBoardRate from './dashboard-rate/DashBoardRate';
import DashboardPager from './dashboard-page/DashboardPager';
import LineChartCore from '../../../components/core/line-chart/LineChartCore';

const DashBoard = () => {
  return (
    <div className='z-10 w-full gap-3 px-3 py-3 sm:flex'>
      <div className='mb-3 w-full'>
        <div className='mb-3 grid gap-3 sm:grid-cols-1 md:grid-cols-3'>
          <Paper elevation={3} className='flex h-24 items-center px-3'>
            <IconifyIcon icon='mi:users' className='h-10 w-11 min-w-max rounded-full bg-[#fdd7be] p-2 text-[#aa7958]' />
            <div className='w-full pl-5'>
              <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
                <div>{300}</div>
                <DashBoardRate type='Increase' pecentage={1.05} />
              </div>
              <div className='test-sm text-gray-400'>Total users</div>
            </div>
          </Paper>
          <Paper elevation={3} className='flex h-24 items-center px-3'>
            <IconifyIcon
              icon='tdesign:user-checked-1'
              className='h-10 w-11 min-w-max rounded-full bg-[#c2fc9c] p-2 text-[#63a537]'
            />
            <div className='w-full pl-5'>
              <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
                <div>{300}</div>
                <DashBoardRate type='Decrease' pecentage={1.05} />
              </div>
              <div className='test-sm text-gray-400'>Active users</div>
            </div>
          </Paper>
          <Paper elevation={3} className='flex h-24 items-center px-3'>
            <IconifyIcon
              icon='tdesign:user-blocked'
              className='h-10 w-11 min-w-max rounded-full bg-[#c2fc9c] p-2 text-[#63a537]'
            />
            <div className='w-full pl-5'>
              <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
                <div>{300}</div>
                <DashBoardRate type='Neutral' pecentage={1.05} />
              </div>
              <div className='test-sm text-gray-400'>Blocked users</div>
            </div>
          </Paper>
        </div>
        <DashboardPager title='Disk Space' className='mb-3'>
          <PieChartCore
            data={[
              { value: 10, label: 'Used', color: '#e33f42' },
              { value: 20, label: 'Free', color: '#63a537' },
            ]}
            sizing={{ height: 350 }}
            outerRadius={120}
          />
        </DashboardPager>
        <DashboardPager title='Visited users'>
          <LineChartCore
            data={[
              { name: 0, value: 80 },
              { name: 1, value: 10 },
              { name: 1.4, value: 20 },
              { name: 2, value: 20 },
            ]}
            color='blue'
            sizing={{ height: 350 }}
          />
        </DashboardPager>
      </div>
      <div className='h-12 bg-green-300 sm:w-[30%]'>
        <RecentlyAddedUsers />
      </div>
    </div>
  );
};

export default DashBoard;
