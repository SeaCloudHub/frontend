import { useIsFileMode, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import DriveLayout from '@/components/layout/DriveLayout';
import PriorityFilter from './priority-filter/PriorityFilter';
import SidePanel from '../my-drive/side-panel/SidePanel';
import PriorityView from './priority-view/PriorityView';
import { useSuggestedEntries } from '@/hooks/drive.hooks';
import { useStorageStore } from '@/store/storage/storage.store';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import InfoButton from '../my-drive/header/InfoButton';

const Priority = () => {
  const { viewMode, setViewMode } = useViewMode();
  const { isFileMode, setIsFileMode } = useIsFileMode();
  const { rootId } = useStorageStore();
  const { arrSelected } = useSelected();
  // const { limit, increaseLimit } = useLimit();
  const { data, isLoading, error } = useSuggestedEntries();

  return (
    <DriveLayout
      headerLeft={
        <div className='flex select-none flex-col overflow-hidden'>
          <div className='mr-2 flex items-center justify-between space-x-2 text-2xl'>
            <div className='line-clamp-1 pb-[20px] pl-5 pt-[17px]'>Welcome to SeaCloud</div>
            <InfoButton />
          </div>
          {arrSelected.length === 0 ? (
            <PriorityFilter viewMode={viewMode} setViewMode={setViewMode} />
          ) : (
            <div className='overflow-x-auto px-4'>
              <MultipleDriveHeader parent='Priority' dir={{ id: rootId, name: 'Priority' }} />
            </div>
          )}
        </div>
      }
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          <PriorityView
            isLoading={isLoading}
            isFileMode={isFileMode}
            entries={data}
            sort={''}
            order={''}
            setSort={({ sort, order }) => console.log(sort, order)}
          />
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Priority'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default Priority;
