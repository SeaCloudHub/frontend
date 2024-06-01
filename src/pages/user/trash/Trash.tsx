import DriveLayout from '@/components/layout/DriveLayout';
import { useCursor, useDrawer, useFilter, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import { useState } from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import ButtonCore from '@/components/core/button/ButtonCore';
import SidePanel from '../my-drive/side-panel/SidePanel';
import TrashPageView from './trash-page-view/TrashPageView';
import { useTrash } from '@/hooks/drive.hooks';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import TrashPageFilter from './trash-page-filter/TrashPageFilter';
import { useStorageStore } from '@/store/storage/storage.store';
import TrashPageHeader from './TrashPageHeader';

const Trash = () => {
  // const { viewMode, setViewMode } = useViewMode();
  // const {modifiedFilter, setModifiedFilter, setTypeFilter, typeFilter} = useFilter();
  const { rootId } = useStorageStore();
  // const {limit, increaseLimit} = useLimit();
  const { nextCursor, currentCursor, setCurrentCursor } = useCursor();
  const [isScrolling, setIsScrolling] = useState(false);

  const { arrSelected } = useSelected();

  const { data, isLoading, error } = useTrash();
  console.log('[Trash] data', data);

  const onScollBottom = () => {
    if (nextCursor !== '' && nextCursor !== currentCursor) {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentCursor(nextCursor);
      }, 1000);
    }
  };

  return (
    <DriveLayout
      headerLeft={<TrashPageHeader />}
      onScrollBottom={onScollBottom}
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          <TrashPageView
            entries={data}
            dir={{ id: rootId, name: 'Trash' }}
            isLoading={isLoading}
            isScrolling={isScrolling}
          />
        )
      }
      sidePanel={
        <SidePanel
          isHidden={arrSelected.length === 0}
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Trash'
              : data
                  .map((timeEntry) => timeEntry.entries)
                  .flat()
                  .find((entry) => entry.id === arrSelected[0].id)?.title || ''
          }
        />
      }
    />
  );
};

export default Trash;
