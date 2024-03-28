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

const peopleFilter = [
  { label: 'Documents', icon: <Icon icon='simple-icons:googledocs' /> },
  { label: 'Spreadsheets', icon: <Icon icon='mdi:google-spreadsheet' /> },
];

const modifiedFilter = [
  { label: 'Today', icon: null },
  { label: 'Last 7 days', icon: null },
  { label: 'This year (2024)', icon: null },
];

type FilterChipProps = {
  setTypeFilterItem: (value: string) => void;
  setPeopleFilterItem: (value: string) => void;
  setModifiedFilterItem: (value: string) => void;
};

const SharingPageFilter: React.FC<FilterChipProps> = ({ setTypeFilterItem, setPeopleFilterItem, setModifiedFilterItem }) => {
  return (
    <div className='flex gap-3'>
      {/* type fillter */}
      <FilterChip name='Type' options={typeFilterItems} action={(value) => setTypeFilterItem(value)} />
      {/* people filter */}
      <FilterChip name='People' options={peopleFilter} action={(value) => setPeopleFilterItem(value)} />
      {/* modified filter */}
      <FilterChip name='Modified' options={modifiedFilter} action={(value) => setModifiedFilterItem(value)} />
    </div>
  );
};

export default SharingPageFilter;
