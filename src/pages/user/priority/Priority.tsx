import { useEffect, useState } from 'react';
import { Path, useDrawer, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import DriveLayout from '@/components/layout/DriveLayout';
import { Icon } from '@iconify/react/dist/iconify.js';
import PriorityFilter from './priority-filter/PriorityFilter';
import SidePanel from '../my-drive/side-panel/SidePanel';
import PriorityView from './priority-view/PriorityView';
import { transformEntries, usePriorityEntries } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/store/auth/session';
import { getListEntriesMyDrive } from '@/apis/drive/drive.api';
import { useStorageStore } from '@/store/storage/storage.store';
import DrivePath from '../my-drive/header/drive-path/DrivePath';
import { ListEntriesRESP } from '@/apis/drive/drive.response';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';

const Priority = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [isFileMode, setIsFileMode] = useState<boolean>(true);
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { rootId } = useStorageStore();
  const [path, setPath] = useState<Path>([{ name: 'Priority', id: rootId }]);
  const { arrSelected } = useSelected();

  // const { data, error, refetch } = useQuery({
  //   queryKey: ['priority-entries', path[path.length - 1].id],
  //   queryFn: async () =>
  //     (await getListEntriesMyDrive({ id: path[path.length - 1].id }).then((res) => res.data.entries)).filter(
  //       (e) => !e.name.includes('.trash'),
  //     ),
  // });
  const {data, isLoading, refetch} = usePriorityEntries();

  // const entries: LocalEntry[] = transformEntries((data || []) as Required<Entry[]> & ListEntriesRESP['entries']);

  return (
    <div>
      <DriveLayout
        headerLeft={
          <div>
            <div className='flex justify-between space-x-2 text-2xl'>
              <div className='w-full pb-[20px] pl-5 pt-[17px]'>Welcome to SeaCloud</div>
              <div className='flex items-center gap-2'>
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
            <div className='px-4'>
              {arrSelected.length === 0 ? (
                <PriorityFilter
                  isFileMode={isFileMode}
                  setIsFileMode={setIsFileMode}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              ) : (
                <MultipleDriveHeader parent='Priority' dirId={rootId} />
              )}
            </div>
          </div>
        }
        bodyLeft={
          <PriorityView
            isFileMode={isFileMode}
            entries={data}
            sort={''}
            order={''}
            setSort={({ sort, order }) => console.log(sort, order)}
          />
        }
        sidePanel={
          <SidePanel
            id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0] : ''}
            title={arrSelected.length === 0 ? 'Priority' :
              data.find((item) => item.id === arrSelected[arrSelected.length - 1])?.title || ''}
          />
        }
      />
    </div>
  );
};

export default Priority;
