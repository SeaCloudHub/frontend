import { useCursor } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

type SortProps = {
  sort: string;
  order: 'asc' | 'desc';
  setSort: ({ sort, order }: { sort: string; order: 'asc' | 'desc' }) => void;
};

const Sort: React.FC<SortProps> = ({ sort, order, setSort }) => {
  const { resetCursor } = useCursor();
  return (
    <Tooltip title='Sort by'>
      <div className='flex flex-row items-center gap-3'>
        <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full px-2 py-1 hover:bg-[#ededed] dark:hover:bg-slate-500'>
          <div className='pb-1 text-sm font-medium'>{sort}</div>
        </div>
        <div
          className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#ededed] dark:hover:bg-slate-500'
          onClick={() => {
            resetCursor();
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
