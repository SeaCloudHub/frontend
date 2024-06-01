import { useCursor, useFilter } from '@/store/my-drive/myDrive.store';
import InfoButton from '../../my-drive/header/InfoButton';
import MemoryFilter from './MemoryFilter';
import DriveFilter from '../../my-drive/header/DriveFilter';

const MemoryHeader = () => {
  const { typeFilter, modifiedFilter, setModifiedFilter, setTypeFilter, resetFilter } = useFilter();
  const { resetCursor } = useCursor();

  return (
    <div className='flex select-none flex-col pr-3'>
      <div className='flex justify-between'>
        <div className='pb-[20px] pl-[20px] pt-[17px] text-2xl font-semibold'>Memory</div>
        <div className='flex items-center pb-[6px] pl-[25px] pr-[11px] pt-[14px]'>
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3 pl-5'>
        <DriveFilter page='memory' />
        {(typeFilter || modifiedFilter) && (
          <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
            <div
              onClick={() => {
                setTypeFilter('');
                setModifiedFilter('');
                resetCursor();
              }}
              className='cursor-pointer text-sm font-medium'>
              Clear filters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryHeader;
