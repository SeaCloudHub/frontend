import { storageLogToDto, userByMonthToDto } from '@/apis/admin/dashboard/dash-board.service';
import { storageLogApi, userStatisticApi } from '@/apis/admin/dashboard/dashboard-api';
import LineChartCore from '@/components/core/line-chart/LineChartCore';
import { numToSize } from '@/utils/function/numbertToSize';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { Paper, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
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
  if (error && isAxiosError<ApiGenericError>(error))
    if (isAxiosError<ApiGenericError>(error)) {
      setErrorMessage(error.response?.data.message);
    } else if (error) {
      setErrorMessage((error as Error).message);
    }
  return { data, isLoading, errorMessage };
};

const DashBoardSkeleton = () => {
  return (
    <Paper
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '.dark &': {
          color: 'white',
          background: '#071A2B',
        },
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
  const [page, setPage] = useState(1);
  const {
    data: logData,
    error: logError,
    isFetching: logFetching,
  } = useQuery({
    queryKey: ['storage-logs', page],
    queryFn: () => storageLogApi({ cursor: '', limit: 10 * page, userID: '' }),
    staleTime: 0,
    select: (data) => data && data.logs.map((item, indext) => storageLogToDto(item)),
  });
  return (
    <div className='h-full w-full  space-y-2 overflow-y-auto overflow-x-hidden  lg:flex lg:space-y-0'>
      <div className='w-full overflow-y-auto lg:h-full  lg:w-3/4 '>
        <div className='flex w-full flex-col'>
          <div className='grid-col-1 grid w-full gap-6 px-1  lg:grid-cols-3'>
            {userStatisticData && (
              <>
                <DashboardCard
                  data={{
                    name: 'Total users',
                    percentage: userStatisticData.statistic_user.find((stat) => stat.name == 'total_users')?.percentage,
                    value: userStatisticData.statistic_user.find((stat) => stat.name === 'total_users')?.value,
                  }}
                />
                <DashboardCard
                  data={{
                    name: 'Blocked users',
                    percentage: userStatisticData.statistic_user.find((stat) => stat.name == 'blocked_users')?.percentage,
                    value: userStatisticData.statistic_user.find((stat) => stat.name === 'blocked_users')?.value,
                  }}
                />
                <DashboardCard
                  data={{
                    name: 'Active users',
                    percentage: userStatisticData.statistic_user.find((stat) => stat.name == 'active_users')?.percentage,
                    value: userStatisticData.statistic_user.find((stat) => stat.name === 'active_users')?.value,
                  }}
                />
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
                data={
                  userStatisticData
                    ? userByMonthToDto(userStatisticData.statistic_user_by_month)
                    : [
                        {
                          name: 'Visited users',
                          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        },
                        {
                          name: 'Active users',
                          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        },
                      ]
                }
                categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                title='User Activity'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div className='mx-1 mb-4 flex-wrap  rounded-lg border shadow-xl  dark:border-gray-50 lg:flex lg:justify-center  '>
            <PieChartCore
              mapperFunction={numToSize}
              data={[
                { value: userStatisticData ? userStatisticData.total_storage_usage : 0, label: 'Used' },
                { value: userStatisticData ? userStatisticData.total_storage_capacity : 0, label: 'Free' },
              ]}
            />
            <PieChartCore
              data={[
                { value: userStatisticData ? userStatisticData.file_by_type['archive'] : 0, label: 'Archive' },
                { value: userStatisticData ? userStatisticData.file_by_type['document'] : 0, label: 'Document' },
                { value: userStatisticData ? userStatisticData.file_by_type['image'] : 0, label: 'Image' },
                { value: userStatisticData ? userStatisticData.file_by_type['pdf'] : 0, label: 'PDF' },
                { value: userStatisticData ? userStatisticData.file_by_type['text'] : 0, label: 'Text' },
                { value: userStatisticData ? userStatisticData.file_by_type['video'] : 0, label: 'Video' },
                { value: userStatisticData ? userStatisticData.file_by_type['other'] : 0, label: 'Another' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className=' ml-1 h-12 lg:w-1/4'>
        {/* <RecentlyAddedUsers /> */}
        <StorageLog
          isFetching={logFetching}
          logs={logData}
          moreClick={() => {
            setPage((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
};

export default DashBoard;
