import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterChip from '@/components/core/filter-chip/FilterChip';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';
import { useFilter } from '@/store/my-drive/myDrive.store';
import { TypeEntry } from '@/apis/drive/drive.request';

const SharingPageFilter = () => {
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
        action={(value) => setModifiedFilter(value)}
        value={modifiedFilterItems.find((item) => item?.value === modifiedFilter)?.label || ''}
      />
    </div>
  );
};

export default SharingPageFilter;
