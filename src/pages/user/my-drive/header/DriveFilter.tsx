import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterChip from '@/components/core/filter-chip/FilterChip';
import { TypeEntry } from '@/apis/drive/drive.request';
import { useCursor, useFilter } from '@/store/my-drive/myDrive.store';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';

type DriveFilterProps = {
  page?: 'my-drive' | 'shared' | 'trash' | 'starred' | 'memory';
};

const DriveFilter: React.FC<DriveFilterProps> = ({ page }) => {
  const { typeFilter, setTypeFilter, modifiedFilter, setModifiedFilter } = useFilter();
  const { nextCursor, resetCursor } = useCursor();
  const typeFilterOptions = page === 'memory' ? typeFilterItems.filter((item) => item.label !== 'Folder') : typeFilterItems;
  return (
    <div className='flex gap-2'>
      <FilterChip
        name='Type'
        options={typeFilterOptions.map((item) => ({ label: item.label, icon: <Icon icon={item.icon} /> }))}
        action={(value) => {
          resetCursor();
          setTypeFilter(value as TypeEntry);
        }}
        value={typeFilterItems.find((item) => item.label === typeFilter)?.label || ''}
      />
      <FilterChip
        name='Modified'
        options={modifiedFilterItems}
        action={(value) => {
          resetCursor();
          setModifiedFilter(value);
        }}
        value={modifiedFilterItems.find((item) => item?.value === modifiedFilter)?.label || ''}
      />
    </div>
  );
};

export default DriveFilter;
