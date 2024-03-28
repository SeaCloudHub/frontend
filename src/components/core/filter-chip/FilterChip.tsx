import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown from '../drop-down/Dropdown';
import React from 'react';

type FilterChipProps = {
  name: string;
  options: { label: string; icon: React.ReactNode }[];
  action?: (value: string) => void;
};

const FilterChip: React.FC<FilterChipProps> = ({ name, options, action }) => {
  const [selected, setSelected] = React.useState<null | string>(null);
  const items = options.map((item) => ({
    label: item.label,
    icon: item.icon,
    action: () => {
      console.log(item.label);
      setSelected(item.label);
      action && action(item.label);
    },
  }));
  return (
    <Dropdown
      button={
        selected === null ? (
          <button className='border-1 flex cursor-pointer items-center space-x-2 rounded-lg border border-outline px-4 py-1 text-sm font-medium hover:bg-surfaceContainer active:bg-surfaceDim'>
            <span>{name}</span>
            <Icon icon='mdi:caret-down' />
          </button>
        ) : (
          <div className='flex'>
            <button className='flex cursor-pointer items-center space-x-2 rounded-l-lg border-0  bg-primaryContainer px-4 py-1 text-sm font-medium hover:bg-primaryFixedDim active:brightness-90'>
              <span>{selected}</span>
              <Icon icon='mdi:caret-down' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
                action && action('');
              }}
              className='cursor-pointer rounded-r-lg border-0  bg-primaryContainer p-2 text-sm font-medium hover:bg-primaryFixedDim active:brightness-90'>
              <Icon icon='mdi:cancel-bold' />
            </button>
          </div>
        )
      }
      items={[items]}
      left={false}
    />
  );
};

export default FilterChip;
