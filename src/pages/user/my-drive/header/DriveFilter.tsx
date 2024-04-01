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
  peopleFilter: string;
  modifiedFilter: string;
  setTypeFilter: (value: string) => void;
  setPeopleFilter: (value: string) => void;
  setModifiedFilter: (value: string) => void;
};

const DriveFilter: React.FC<FilterChipProps> = ({
  setTypeFilter,
  setPeopleFilter,
  setModifiedFilter,
  typeFilter,
  peopleFilter,
  modifiedFilter,
}) => {
  return (
    <div className='flex gap-2'>
      <FilterChip name='Type' options={typeFilterItems} action={(value) => setTypeFilter(value)} value={typeFilter} />
      <FilterChip name='People' options={peopleFilterItems} action={(value) => setPeopleFilter(value)} value={peopleFilter} />
      <FilterChip
        name='Modified'
        options={modifiedFilterItems}
        action={(value) => setModifiedFilter(value)}
        value={modifiedFilter}
      />
    </div>
  );
};

export default DriveFilter;
