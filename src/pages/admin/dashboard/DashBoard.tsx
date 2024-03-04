import PieChartCore from '../../../components/core/pie-chart/PieChart';
import LineChartCore from '../../../components/core/line-chart/LineChartCore';
import { Box, Paper, Typography } from '@mui/material';
import { Group, HowToReg } from '@mui/icons-material';
import RecentlyAddedUsers from './dashboard-user/RecentlyAddedUsers';
import DynamicLayout from '../../../components/layout/DynamicLayout';

const DashBoard = () => {
  return (
    <DynamicLayout>
      <div className='w-full sm:flex px-3 py-3 gap-3'>
        <div className='w-full mb-3'>
          <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-3 mb-3'>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant='h5' className='text-center' fontWeight={550}>
                Total Users
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Group sx={{ height: 80, width: 80, color: '#3f42e3', mr: 1 }} />
                <Typography variant='h5'>{10}</Typography>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant='h5' className='text-center' fontWeight={550}>
                Active Users
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <HowToReg sx={{ height: 80, width: 80, mr: 1, color: '#42e33f' }} />
                <Typography variant='h5'>{10}</Typography>
              </Box>
            </Paper>
          </div>
          <Paper elevation={3} sx={{ p: 3 }} className='mb-3'>
            <PieChartCore
              data={[
                { value: 10, label: 'Used', color: '#e33f42' },
                { value: 20, label: 'Free', color: '#42e33f' },
              ]}
              sizing={{ height: 200 }}
            />
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <LineChartCore
              data={[
                { name: 0, value: 80 },
                { name: 1, value: 10 },
                { name: 1.4, value: 20 },
                { name: 2, value: 20 },
              ]}
              color='blue'
              sizing={{ height: 200 }}
            />
          </Paper>
        </div>
        <div className='sm:w-[30%] h-12 bg-green-300'>
          <RecentlyAddedUsers />
        </div>
      </div>
    </DynamicLayout>
  );
};

export default DashBoard;
