import DriveLayout from '@/components/layout/DriveLayout';
import { useDrawer, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
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
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const { rootId } = useStorageStore();

  const { arrSelected, setArrSelected } = useSelected();
  console.log('[Trash] arrSelected', arrSelected);

  const { data, isLoading, refetch } = useTrash();

  return (
    <DriveLayout
      headerLeft={
        <TrashPageHeader
          modifiedFilterItem={modifiedFilterItem}
          setModifiedFilterItem={setModifiedFilterItem}
          setTypeFilterItem={setTypeFilterItem}
          typeFilterItem={typeFilterItem}
        />
      }
      bodyLeft={<TrashPageView entries={data} dir={{
        id: rootId,
        name: 'Trash'
      }} />}
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0] : ''}
          title={
            arrSelected.length === 0 ? 'Trash' : data.find((item) => item.id === arrSelected[arrSelected.length - 1])?.title || ''
          }
        />
      }
    />
  );
};

export default Trash;
