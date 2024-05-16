import React from 'react';
import SharingPageViewMode from '../../shared/sharing-page-view/SharingPageViewMode';
import PriorityViewType from '../priority-view-type/PriorityViewType';

type PriorityFilterProps = {
  viewMode: string;
  setViewMode: (value: string) => void;

  // isFileMode: boolean;
  // setIsFileMode: (value: boolean) => void;
};

const PriorityFilter: React.FC<PriorityFilterProps> = ({
  viewMode,
  setViewMode,
  // isFileMode, setIsFileMode
}) => {
  return (
    <div className='flex items-center justify-between overflow-x-auto px-4'>
      <div className='flex items-center gap-3'>
        <span className='text-md font-semibold'>Recommend</span>
        <PriorityViewType />
      </div>
      <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
    </div>
  );
};

export default PriorityFilter;
