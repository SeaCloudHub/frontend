import LineChartCore from '@/components/core/line-chart/LineChartCore';
import { Paper } from '@mui/material';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import AccordionCore from '../../../components/core/accordion/AccordionCore';
import PieChartCore from '../../../components/core/pie-chart/PieChart';
import StorageStatistic from '../shared/StorageStatistic';
import DashBoardRate from './components/DashBoardRate';
import RecentlyAddedUsers from './components/RecentlyAddedUsers';
import StorageLog from './components/StorageLog';

const DashBoard = () => {
  return (
    <div className='z-10 w-full gap-3 lg:flex'>
      <div className='w-full'>
        <div className='w-full lg:flex lg:justify-between '>
          <div className='flex min-w-[30%] flex-col justify-between lg:mr-3 '>
            <Paper
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              elevation={3}
              className='flex h-24 items-center px-3 '>
              <IconifyIcon icon='mi:users' className='h-10 w-11 min-w-max rounded-full bg-[#fdd7be] p-2 ' />
              <div className='w-full pl-5'>
                <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
                  <div>{300}</div>
                  <DashBoardRate type='Increase' pecentage={1.05} />
                </div>
                <div className='test-sm '>Total users</div>
              </div>
            </Paper>
            <Paper
              elevation={3}
              className='flex h-24 items-center px-3'
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}>
              <IconifyIcon icon='tdesign:user-checked-1' className='h-10 w-11 min-w-max rounded-full bg-[#c2fc9c] p-2 ' />
              <div className='w-full pl-5'>
                <div className='flex min-w-max items-center justify-between text-xl font-bold '>
                  <div>{300}</div>
                  <DashBoardRate type='Decrease' pecentage={1.05} />
                </div>
                <div className='test-sm '>Active users</div>
              </div>
            </Paper>
            <Paper
              elevation={3}
              className='flex h-24 items-center px-3'
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}>
              <IconifyIcon icon='tdesign:user-blocked' className='h-10 w-11 min-w-max rounded-full bg-red-300 p-2 ' />
              <div className='w-full pl-5'>
                <div className='flex min-w-max items-center justify-between text-xl font-bold '>
                  <div>{300}</div>
                  <DashBoardRate type='Neutral' pecentage={1.05} />
                </div>
                <div className='test-sm '>Blocked users</div>
              </div>
            </Paper>
          </div>
          <AccordionCore className='w-full' title='Visited users'>
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
          </AccordionCore>
        </div>
        <AccordionCore title='Disk Space' className='mb-3'>
          <StorageStatistic />
          <div className='lg:flex lg:items-center'>
            <PieChartCore
              data={[
                { value: 10, label: 'Used', color: '#e33f42' },
                { value: 20, label: 'Free', color: '#63a537' },
              ]}
              sizing={{ height: 350 }}
              outerRadius={120}
            />
            <PieChartCore
              data={[
                { value: 10, label: 'Document', color: '#e33f42' },
                { value: 20, label: 'Iamge', color: '#63a537' },
                { value: 10, label: 'zip', color: '#e33f42' },
                { value: 20, label: 'Another', color: '#63a537' },
              ]}
              sizing={{ height: 350 }}
              outerRadius={120}
            />
          </div>
        </AccordionCore>
      </div>
      <div className='h-12 bg-green-300 '>
        <RecentlyAddedUsers />
        <StorageLog />
      </div>
    </div>
  );
};

export default DashBoard;
