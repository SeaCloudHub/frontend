import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown from '../drop-down/Dropdown';
import React from 'react';
import CustomDropdown from '../drop-down/CustomDropdown';
import { Tooltip } from '@mui/material';

type FilterChipProps = {
  name: string;
  options: { label: string; icon: React.ReactNode }[];
  action?: (value: string) => void;
  value?: string;
};

const FilterChip: React.FC<FilterChipProps> = ({ name, options, action, value }) => {
  const items = options.map((item) => ({
    label: item.label,
    icon: item.icon,
    action: () => {
      console.log(item.label);
      action && action(item.label);
    },
  }));
  return (
    <CustomDropdown
      button={
        value === '' ? (
          <div className='border-1 flex h-[30px] cursor-pointer items-center justify-between space-x-2 rounded-lg border border-outline px-4 py-1 text-sm font-medium hover:bg-surfaceContainer active:bg-surfaceDim dark:hover:bg-slate-500'>
            <span className='line-clamp-1'>{name}</span>
            <Icon icon='mdi:caret-down' />
          </div>
        ) : (
          <div className='flex h-[30px]'>
            <div className='flex cursor-pointer items-center space-x-2 rounded-l-lg border-0 bg-primaryContainer px-4 py-1 text-sm font-medium hover:bg-primaryFixedDim active:brightness-90'>
              <Tooltip title={value}>
                <span className='line-clamp-1'>{value}</span>
              </Tooltip>
              <Icon icon='mdi:caret-down' />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                action && action('');
              }}
              className='cursor-pointer rounded-r-lg border-0  bg-primaryContainer p-2 text-sm font-medium hover:bg-primaryFixedDim active:brightness-90'>
              <Icon icon='mdi:cancel-bold' />
            </div>
          </div>
        )
      }
      items={[items]}
    />
  );
};

export default FilterChip;
