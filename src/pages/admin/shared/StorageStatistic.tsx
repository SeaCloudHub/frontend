import IconifyIcon from '../../../components/core/Icon/IConCore';

type StorageStatisticProps = {
  name?: string;
};
const StorageStatistic = () => {
  return (
    <div className='m-5 flex rounded-lg bg-white'>
      <div className=' flex items-center border-r-2 p-4'>
        <IconifyIcon icon={'ic:twotone-cloud'} fontSize={30} />
        <div className='ml-4 flex flex-col items-center'>
          <p className='h4 text-gray-600'>Total Memory</p>
          <p className='h3 statement-upper-medium text-green-500'>0 bytes</p>
        </div>
      </div>
      <div className='flex flex-col items-center p-4'>
        <p className='h4 text-gray-600'> Used Memory</p>
        <p className='h3 statement-upper-medium text-red-500'>2 bytes</p>
      </div>
      <div className='spasce-x-2 flex border-r-2'></div>
    </div>
  );
};

export default StorageStatistic;
