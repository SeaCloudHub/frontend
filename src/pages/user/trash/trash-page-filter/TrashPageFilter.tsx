import { TypeEntry } from '@/apis/drive/drive.request';
import FilterChip from '@/components/core/filter-chip/FilterChip';
import { useFilter } from '@/store/my-drive/myDrive.store';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

const TrashPageFilter = () => {
  const { modifiedFilter, setModifiedFilter, setTypeFilter, typeFilter } = useFilter();
  return (
    <div className='flex gap-2'>
      <FilterChip
        name='Type'
        options={typeFilterItems.map((item) => ({ label: item.label, icon: <Icon icon={item.icon} /> }))}
        action={(value) => setTypeFilter(value as TypeEntry)}
        value={typeFilter}
      />
      <FilterChip
        name='Modified'
        options={modifiedFilterItems}
        action={(value) => setModifiedFilter(value as TypeEntry)}
        value={modifiedFilter}
      />
    </div>
  );
};

export default TrashPageFilter;
