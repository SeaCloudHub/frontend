import DriveLayout from '@/components/layout/DriveLayout';
import { useSharedFileInfo } from '@/store/storage/file-share-info.store';
import DrivePath from '../my-drive/header/drive-path/DrivePath';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { useCursor, useDrawer, useFilter, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import { DriveGridView } from '../my-drive/content/DriveGridView';
import { DriveListView } from '../my-drive/content/DriveListView';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { useStorageStore } from '@/store/storage/storage.store';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import ShareFolderBreadcum from './ShareFolderBreadcum';
import { useListEntries, usePathParents } from '@/hooks/drive.hooks';
import { useEffect, useState } from 'react';
import { UserRole } from '@/utils/types/user-role.type';
import { useNavigate } from 'react-router-dom';
import { DRIVE_HOME, DRIVE_MY_DRIVE } from '@/utils/constants/router.constant';

const ShareFolder = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  // const {fileInfo, role} = useSharedFileInfo();
  // console.log('[ShareFolder] fileInfo', fileInfo);
  // const parents = [
  //   {id: rootId, name: 'Shared with me', userRoles: ['editor'] as UserRole[]},
  //   {id: fileInfo.id, name: fileInfo.title, userRoles: fileInfo.userRoles as UserRole[]}
  // ]
  // console.log('[ShareFolder] fileInfo', fileInfo);
  const { viewMode, setViewMode } = useViewMode();
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { arrSelected } = useSelected();
  const { nextCursor, currentCursor, setCurrentCursor } = useCursor();
  const { modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter } = useFilter();

  const { data, isLoading, error } = useListEntries();
  const { parents, error: parentError } = usePathParents();

  useEffect(() => {
    if (parents?.length>0 && parents[0].id === rootId) {
      if(parents.length > 1) {
        navigate(`${DRIVE_MY_DRIVE}/dir/${parents[parents.length - 1].id}`);
      } else {
        navigate(DRIVE_MY_DRIVE);
      }
    }
  }, [parents, rootId, setCurrentCursor]);

  const onScollBottom = () => {
    if (nextCursor !== '' && currentCursor !== nextCursor) {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentCursor(nextCursor);
      }, 1000);
    }
  };

  return (
    <DriveLayout
      headerLeft={
        <div className='flex flex-col overflow-hidden'>
          <div className='flex justify-between space-x-2 text-2xl'>
            <div className='w-full pb-[14px] pt-[15px]'>
              <DrivePath path={parents} type='Shared' />
            </div>
            <div className='flex items-center gap-2'>
              <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
              <Icon
                icon='mdi:information-outline'
                className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
                onClick={() => {
                  if (!drawerOpen) {
                    openDrawer();
                  } else {
                    closeDrawer();
                  }
                }}
              />
            </div>
          </div>
          {arrSelected.length === 0 ? (
            <>
              <div className='flex items-center gap-3 px-5'>
                <SharingPageFilter />
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
            </>
          ) : (
            <div className='overflow-x-auto px-4 py-1'>
              <MultipleDriveHeader
                parent='SharedWithMe'
                dir={{
                  id: arrSelected.length === 1 ? arrSelected[0].id : '',
                  name: arrSelected.length === 1 ? data.find((item) => item.id === arrSelected[0].id)?.title || '' : '',
                }}
              />
            </div>
          )}
        </div>
      }
      onScrollBottom={onScollBottom}
      bodyLeft={
        parentError || error ? (
          <div className='text-center text-lg text-red-500'>Error: {parentError || error}</div>
        ) : (
          viewMode === 'grid' ? (
            <DriveGridView
              entries={data}
              parent='shared'
              isLoading={isLoading}
              curDir={parents[parents.length - 1]}
              isScrolling={isScrolling}
            />
          ) : (
            <DriveListView
              entries={data}
              parent='shared'
              curDir={parents[parents.length - 1]}
              isLoading={isLoading}
              isScrolling={isScrolling}
            />
          )
        )
      }
      sidePanel={
        <SidePanel
          isHidden={arrSelected.length === 0}
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Shared'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default ShareFolder;
