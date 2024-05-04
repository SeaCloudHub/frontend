import { userStatisticApi } from '@/apis/admin/dashboard/dashboard-api';
import LineChartCore from '@/components/core/line-chart/LineChartCore';
import { Paper, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PieChartCore from '../../../components/core/pie-chart/PieChart';
import DashboardCard from './components/DashboardCard';
import StorageLog from './components/StorageLog';

const UserStatisticHook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ['user-statistic'],
    queryFn: () => userStatisticApi(),
    staleTime: 0,
  });

  return { data, isLoading, errorMessage };
};

const DashBoardSkeleton = () => {
  return (
    <Paper
      sx={{
        transition: 'transform 0.3s ease-in-out',
      }}
      elevation={3}
      className='flex h-fit w-full justify-center rounded-lg border border-gray-50 px-6 py-5  shadow-lg'>
      <Skeleton variant='circular' width={45} height={40} />
      <div className='w-full pl-5'>
        <div className='flex min-w-max items-center justify-between text-xl font-bold text-gray-700'>
          <Skeleton variant='text' width={50} />
          <Skeleton variant='text' width={50} />
        </div>
        <Skeleton variant='text' width={100} />
      </div>
    </Paper>
  );
};

const DashBoard = () => {
  const { data: userStatisticData, errorMessage: userStatisticError, isLoading: userStatisticLoading } = UserStatisticHook();
  return (
    <div className='h-full w-full  space-y-2 overflow-y-auto overflow-x-hidden  lg:flex lg:space-y-0'>
      <div className='w-full overflow-y-auto lg:h-full  lg:w-3/4 '>
        <div className='flex w-full flex-col'>
          <div className='grid-col-1 grid w-full gap-6 px-1  lg:grid-cols-3'>
            {userStatisticData && (
              <>
                <DashboardCard data={{ name: 'Total users', percentage: 1.05, value: userStatisticData.total_users }} />
                <DashboardCard data={{ name: 'Blocked users', percentage: 0, value: userStatisticData.blocked_users }} />
                <DashboardCard data={{ name: 'Active users', percentage: -1.05, value: userStatisticData.active_users }} />
              </>
            )}
            {userStatisticLoading && (
              <>
                <DashBoardSkeleton />
                <DashBoardSkeleton />
                <DashBoardSkeleton />
              </>
            )}
          </div>
          <div className='flex w-full flex-col gap-6'>
            <div className='mx-1 my-4  rounded-lg border shadow-lg'>
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
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div className='mx-1 mb-4 flex-wrap  rounded-lg border shadow-xl  dark:border-gray-50 lg:flex lg:justify-center  '>
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
      <div className=' ml-1 h-12 lg:w-1/4'>
        {/* <RecentlyAddedUsers /> */}
        <StorageLog />
      </div>
    </div>
  );
};

export default DashBoard;
