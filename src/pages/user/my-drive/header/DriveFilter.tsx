import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterChip from '@/components/core/filter-chip/FilterChip';
import { TypeEntry } from '@/apis/drive/drive.request';
import { useTypeFilter } from '@/store/my-drive/myDrive.store';

const typeFilterItems = [
  {
    label: 'Folder',
    icon: <Icon icon='mdi:folder' />,
  },
  {
    label: 'Text',
    icon: <Icon icon='mdi:file-document' />,
  },
  {
    label: 'Document',
    icon: <Icon icon='simple-icons:googledocs' />,
  },
  {
    label: 'Pdf',
    icon: <Icon icon='mdi:file-pdf' />,
  },
  {
    label: 'Json',
    icon: <Icon icon='mdi:json' />,
  },
  {
    label: 'Image',
    icon: <Icon icon='mdi:image' />,
  },
  {
    label: 'Video',
    icon: <Icon icon='mdi:video' />,
  },
  {
    label: 'Audio',
    icon: <Icon icon='mdi:audio' />,
  },
  {
    label: 'Archive',
    icon: <Icon icon='mdi:archive' />,
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
  // typeFilter: TypeEntry;
  // peopleFilter: string;
  modifiedFilter: string;
  // setTypeFilter: (value: TypeEntry) => void;
  // setPeopleFilter: (value: string) => void;
  setModifiedFilter: (value: string) => void;
};

const DriveFilter: React.FC<FilterChipProps> = ({
  // setTypeFilter,
  // setPeopleFilter,
  setModifiedFilter,
  // typeFilter,
  // peopleFilter,
  modifiedFilter,
}) => {
  const { typeFilter, setTypeFilter } = useTypeFilter();
  return (
    <div className='flex gap-2'>
      <FilterChip
        name='Type'
        options={typeFilterItems}
        action={(value) => setTypeFilter(value as TypeEntry)}
        value={typeFilter}
      />
      {/* <FilterChip name='People' options={peopleFilterItems} action={(value) => setPeopleFilter(value)} value={peopleFilter} /> */}
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
