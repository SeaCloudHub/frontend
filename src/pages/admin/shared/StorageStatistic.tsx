import IconifyIcon from '../../../components/core/Icon/IConCore';

type StorageStatisticProps = {
  name?: string;
};
const StorageStatistic = () => {
  return (
    <>
      <div className='flex w-full space-x-4 border-b-2  border-black p-3'>
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
      <div className='h-8 w-full bg-gray-200'></div>
      <div className='mt-2 flex flex-wrap '>
        <div className='mx-2 flex space-x-2'>
          <div className='flex h-8 w-8 items-center bg-slate-700'></div>
          <p>Regular files (0 bytes)</p>
        </div>
        <div className='mx-2 flex items-center space-x-2'>
          <div className='h-8 w-8 bg-blue-600'></div>
          <p>Shared files(0 bytes)</p>
        </div>
        <div className='mx-2 flex  items-center space-x-2'>
          <div className='h-8 w-8 bg-purple-800'></div>
          <p>Backup files (0 bytes)</p>
        </div>
      </div>
    </>
  );
};

export default StorageStatistic;
