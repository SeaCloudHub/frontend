import { numToSize } from '@/utils/function/numbertToSize';
import IconifyIcon from '../../../components/core/Icon/IConCore';

type StorageStatisticProps = {
  totalMemory?: number;
  usedMemory?: number;
};
const StorageStatistic = ({ totalMemory, usedMemory }: StorageStatisticProps) => {
  return (
    <div className='flex rounded-lg dark:border dark:border-white dark:text-white'>
      <div className=' flex items-center border-r p-4'>
        <IconifyIcon icon={'ic:twotone-cloud'} fontSize={30} />
        <div className='ml-4 flex flex-col items-center'>
          <p className='md:h4'>Total Memory</p>
          <p className='md:h3 statement-upper-medium text-green-500'>{numToSize(totalMemory)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center p-4'>
        <p className='md:h4 '> Used Memory</p>
        <p className='md:h3 statement-upper-medium text-red-500'>{numToSize(usedMemory)}</p>
      </div>
      <div className='spasce-x-2 flex border-r'></div>
    </div>
  );
};

export default StorageStatistic;
