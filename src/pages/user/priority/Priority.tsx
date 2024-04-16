import { useEffect, useState } from 'react';
import { useDrawer, useViewMode } from '@/store/my-drive/myDrive.store';
import DriveLayout from '@/components/layout/DriveLayout';
import { Icon } from '@iconify/react/dist/iconify.js';
import PriorityFilter from './priority-filter/PriorityFilter';
import SidePanel from '../my-drive/side-panel/SidePanel';
import PriorityView from './priority-view/PriorityView';
import { remoteToLocalEntries } from '../my-drive/content/DriveGridView';
import { fakeData } from '../shared/Shared';
import { toast } from 'react-toastify';
import { LocalEntry } from '../my-drive/MyDrive';
import { Entry } from '@/utils/types/entry.type';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/store/auth/session';
import { getListEntriesMyDrive } from '@/apis/drive/list-entries.api';
import { ListEntriesRESP } from '@/apis/drive/response/list-entries.reponse';

const Priority = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [isFileMode, setIsFileMode] = useState<boolean>(true);
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { root_id } = useSession();

  const {data, error, refetch} = useQuery({
    queryKey: ['priority-entries', root_id],
    queryFn: async () => (await getListEntriesMyDrive({id: root_id}).then((res) => res.data.entries)).filter(e=>!e.name.includes('.trash'))
  });
  const entries: LocalEntry[] = remoteToLocalEntries((data || []) as Required<Entry[]>&ListEntriesRESP['entries']);

  useEffect(() => {
    error && toast.error('Failed to fetch entries');
  }, [error]);

  // const entries = remoteToLocalEntries(fakeData);
  return (
    <div>
      <DriveLayout
        headerLeft={
          <div className='px-4'>
            <div className='flex justify-between space-x-2 text-2xl'>
              <h2 className='py-2 text-3xl font-semibold'>Welcome</h2>
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

            <PriorityFilter isFileMode={isFileMode} setIsFileMode={setIsFileMode} viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        }
        bodyLeft={
          <PriorityView
            isFileMode={isFileMode}
            entries={entries}
            sort={''}
            order={''}
            setSort={({ sort, order }) => console.log(sort, order)}
          />
        }
        sidePanel={<SidePanel />}
      />
    </div>
  );
};

export default Priority;
