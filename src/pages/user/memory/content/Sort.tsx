import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

type SortProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
};

const Sort: React.FC<SortProps> = ({ sort, order, setSort }) => {
  return (
    <Tooltip title='Sort by'>
      <div className='flex flex-row items-center'>
        <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
          <div className='pb-1 text-sm font-medium'>{sort}</div>
        </div>
        <div
          className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#ededed]'
          onClick={() => {
            setSort({ sort, order: order === 'asc' ? 'desc' : 'asc' });
          }}>
          {order === 'asc' ? (
            <Icon icon='mdi:arrow-up' className='h-[18px] w-[18px]' />
          ) : (
            <Icon icon='mdi:arrow-down' className='h-[18px] w-[18px]' />
          )}
        </div>
      </div>
    </Tooltip>
  );
};

export default Sort;
