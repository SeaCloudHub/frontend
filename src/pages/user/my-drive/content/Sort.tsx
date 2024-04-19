import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

type SortProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
};

const Sort: React.FC<SortProps> = ({ sort, order, setSort }) => {
  const sortItems: MenuItem[][] = [
    [
      {
        label: 'Name',
        icon: null,
        action: () => {
          setSort({ sort: 'Name', order });
        },
      },
      {
        label: 'Last modified',
        icon: null,
        action: () => {
          setSort({ sort: 'Last modified', order });
        },
      },
      {
        label: 'Last modified by me',
        icon: null,
        action: () => {
          setSort({ sort: 'Last modified by me', order });
        },
      },
      {
        label: 'Last opened by me',
        icon: null,
        action: () => {
          setSort({ sort: 'Last opened by me', order });
        },
      },
    ],
  ];

  return (
    <Tooltip title='Sort by'>
      <div className='flex flex-row items-center'>
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
        {/* <Dropdown
          button={
            <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
              <div className='pb-1 text-xs font-medium'>{sort}</div>
              <Icon icon='mdi:caret-down' className='h-5 w-5' />
            </div>
          }
          items={sortItems}
          left={true}
        /> */}
        <CustomDropdown
          button={
            <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
              <div className='pb-1 text-xs font-medium'>{sort}</div>
              <Icon icon='mdi:caret-down' className='h-5 w-5' />
            </div>
          }
          items={sortItems}
        />
      </div>
    </Tooltip>
  );
};

export default Sort;
