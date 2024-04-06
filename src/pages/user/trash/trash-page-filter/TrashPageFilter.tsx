import FilterChip from '@/components/core/filter-chip/FilterChip';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

type TrashPageFilterProps = {
  typeFilter: string;
  setTypeFilterItem: (value: string) => void;
  modifiedFilter: string;
  setModifiedFilterItem: (value: string) => void;
};

const TrashPageFilter: React.FC<TrashPageFilterProps> = ({
  setTypeFilterItem,
  setModifiedFilterItem,
  typeFilter,
  modifiedFilter,
}) => {
  return (
    <div className='flex gap-3'>
      type fillter
      <FilterChip
        name='Type'
        options={typeFilterItems.map((item) => ({ label: item.label, icon: <Icon icon={item.icon} /> }))}
        action={(value) => setTypeFilterItem(value)}
        value={typeFilter}
      />
      {/* modified filter */}
      <FilterChip
        name='Modified'
        options={modifiedFilterItems}
        action={(value) => setModifiedFilterItem(value)}
        value={modifiedFilter}
      />
    </div>
  );
};

export default TrashPageFilter;
