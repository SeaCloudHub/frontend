import InfoButton from '../../my-drive/header/InfoButton';
import MemoryFilter from './MemoryFilter';

type MemoryHeaderProps = {
  typeFilter: string;
  modifiedFilter: string;
  setTypeFilter: (type: string) => void;
  setModifiedFilter: (modified: string) => void;
};

const MemoryHeader: React.FC<MemoryHeaderProps> = ({ modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter }) => {
  return (
    <div className='flex flex-col pr-3'>
      <div className='flex justify-between'>
        <div className='pb-[20px] pl-[20px] pt-[17px] text-2xl font-semibold'>Memory</div>
        <div className='flex items-center pb-[6px] pl-[25px] pr-[11px] pt-[14px]'>
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3 pl-5'>
        {/* <MemoryFilter
          setModifiedFilter={setModifiedFilter}
          setTypeFilter={setTypeFilter}
          modifiedFilter={modifiedFilter}
          typeFilter={typeFilter}
        /> */}
        {(typeFilter || modifiedFilter) && (
          <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
            <div
              onClick={() => {
                setTypeFilter('');
                setModifiedFilter('');
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
