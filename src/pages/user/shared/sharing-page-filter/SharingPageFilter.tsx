import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterChip from '@/components/core/filter-chip/FilterChip';

const typeFilterItems = [
  {
    label: 'Documents',
    icon: <Icon icon='simple-icons:googledocs' />,
  },
  {
    label: 'Spreadsheets',
    icon: <Icon icon='mdi:google-spreadsheet' />,
  },
  {
    label: 'Presentations',
    icon: <Icon icon='mdi:file-presentation-box' />,
  },
];

const peopleFilterItems = [
  { label: 'Documents', icon: <Icon icon='simple-icons:googledocs' /> },
  { label: 'Spreadsheets', icon: <Icon icon='mdi:google-spreadsheet' /> },
];

const modifiedFilterItems = [
  { label: 'Today', icon: null },
  { label: 'Last 7 days', icon: null },
  { label: 'This year (2024)', icon: null },
];

type FilterChipProps = {
  typeFilter: string;
  setTypeFilterItem: (value: string) => void;
  peopleFilter: string;
  setPeopleFilterItem: (value: string) => void;
  modifiedFilter: string;
  setModifiedFilterItem: (value: string) => void;
};

const SharingPageFilter: React.FC<FilterChipProps> = ({
  setTypeFilterItem,
  setPeopleFilterItem,
  setModifiedFilterItem,
  typeFilter,
  peopleFilter,
  modifiedFilter,
}) => {
  return (
    <div className='flex gap-3'>
      {/* type fillter */}
      <FilterChip name='Type' options={typeFilterItems} action={(value) => setTypeFilterItem(value)} value={typeFilter} />
      {/* people filter */}
      <FilterChip name='People' options={peopleFilterItems} action={(value) => setPeopleFilterItem(value)} value={peopleFilter} />
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
