import { getStorage } from '@/apis/drive/drive.api';
import { classNames } from '@/components/core/drop-down/Dropdown';
import { useMemoryStatistics } from '@/hooks/drive.hooks';
import { numToSize } from '@/utils/function/numbertToSize';
import { LinearProgress, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const files: { type: string; color: string; width: number }[] = [
  {
    type: 'PDF',
    color: '#033BF1',
    width: 200,
  },
  {
    type: 'Images',
    color: '#33cc33',
    width: 10,
  },
  {
    type: 'Document',
    color: '#f12345',
    width: 5,
  },
  {
    type: 'Presentations',
    color: 'bg-[#ff6600]',
    width: 5,
  },
  {
    type: 'Another',
    color: '#928B88',
    width: 5,
  },
];

const Statistics = () => {
  const { data, isLoading } = useMemoryStatistics();
  const total = data?.types.reduce((acc, type) => acc + type.value, 0);

  return isLoading ? (
    <LinearProgress className='translate-y-1' />
  ) : (
    <div>
      <div className='flex items-center space-x-3'>
        <p className='h3'>{numToSize(total)}</p>
        <p className='stat statement-upper-medium text-gray-500'>of {numToSize(data.capacity)} used</p>
      </div>
      <div className='mt-2 flex h-2 w-full items-center rounded-full bg-slate-300'>
        {data &&
          data.types.map((type) => (
            <Tooltip title={`${type.title}: ${numToSize(type.value)}`} key={type.title}>
              <div
                className={`h-2 rounded-full border-2 p-1 hover:z-20 hover:border-2 hover:p-1.5`}
                style={{
                  backgroundColor: type.color,
                  width:
                    total < 0.5 * data.capacity
                      ? `${(type.value / (2 * total)) * 100}%`
                      : `${(type.value / data.capacity) * 100}%`,
                }}></div>
            </Tooltip>
          ))}
      </div>
      <div className='flex flex-wrap space-x-3'>
        {data &&
          data.types.map((type) => (
            <div key={type.title} className='flex items-center space-x-2'>
              <div className='h-2 w-2 rounded-full' style={{ backgroundColor: type.color }}></div>
              <p className='stat statement-upper-medium'>{type.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Statistics;
