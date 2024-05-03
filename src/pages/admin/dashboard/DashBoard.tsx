import LineChartCore from '@/components/core/line-chart/LineChartCore';
import PieChartCore from '../../../components/core/pie-chart/PieChart';
import DashboardCard from './components/DashboardCard';
import StorageLog from './components/StorageLog';

const DashBoard = () => {
  return (
    <div className='h-full w-full  space-y-2 overflow-y-auto overflow-x-hidden  lg:flex lg:space-y-0'>
      <div className='w-full overflow-y-auto lg:h-full  lg:w-3/4 '>
        <div className='flex w-full flex-col'>
          <div className='grid-col-1 grid w-full gap-6 px-1  lg:grid-cols-3'>
            <DashboardCard data={{ name: 'Total users', percentage: 1.05, value: 300 }} />
            <DashboardCard data={{ name: 'Active users', percentage: -1.05, value: 260 }} />
            <DashboardCard data={{ name: 'Blocked users', percentage: 0, value: 40 }} />
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
