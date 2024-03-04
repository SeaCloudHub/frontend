import PieChartCore from '../../../components/core/pie-chart/PieChart';
import LineChartCore from '../../../components/core/line-chart/LineChartCore';
import { Box, Paper, Typography } from '@mui/material';
import { Group, HowToReg } from '@mui/icons-material';
import RecentlyAddedUsers from './dashboard-user/RecentlyAddedUsers';

const DashBoard = () => {
  return (
    <div className='w-full sm:flex px-3 py-3 gap-3 z-10'>
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
              <Group sx={{ height: 80, width: 80, color: '#aa7958', mr: 1 }} />
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
              <HowToReg sx={{ height: 80, width: 80, mr: 1, color: '#63a537' }} />
              <Typography variant='h5'>{10}</Typography>
            </Box>
          </Paper>
        </div>
        <Paper elevation={3} sx={{ p: 0 }} className='mb-3'>
          <Typography variant='h5' className='text-center' paddingTop={1} fontWeight={550}>
            Disk Space
          </Typography>
          <PieChartCore
            data={[
              { value: 10, label: 'Used', color: '#e33f42' },
              { value: 20, label: 'Free', color: '#63a537' },
            ]}
            sizing={{ height: 350 }}
            outerRadius={120}
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
            sizing={{ height: 350 }}
          />
        </Paper>
      </div>
      <div className='sm:w-[30%] h-12 bg-green-300'>
        <RecentlyAddedUsers />
      </div>
    </div>
  );
};

export default DashBoard;
