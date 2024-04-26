import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterChip from '@/components/core/filter-chip/FilterChip';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';
import { peopleFilterItems } from '@/utils/constants/people-filter-constant';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';

type SharingPageFilterProps = {
  typeFilter: string;
  setTypeFilterItem: (value: string) => void;
  peopleFilter: string;
  setPeopleFilterItem: (value: string) => void;
  modifiedFilter: string;
  setModifiedFilterItem: (value: string) => void;
};

const SharingPageFilter: React.FC<SharingPageFilterProps> = ({
  setTypeFilterItem,
  setPeopleFilterItem,
  setModifiedFilterItem,
  typeFilter,
  peopleFilter,
  modifiedFilter,
}) => {
  return (
    <div className='flex gap-2'>
      {/* type fillter */}
      <FilterChip
        name='Type'
        options={typeFilterItems.map((item) => ({ label: item.label, icon: <Icon icon={item.icon} /> }))}
        action={(value) => setTypeFilterItem(value)}
        value={typeFilter}
      />
      {/* people filter */}
      <FilterChip
        name='People'
        options={peopleFilterItems.map((item) => ({ label: item.label, icon: <Icon icon={item.icon} /> }))}
        action={(value) => setPeopleFilterItem(value)}
        value={peopleFilter}
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

export default SharingPageFilter;
