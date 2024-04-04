import { Tab } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Avatar, Button } from '@mui/material';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { Activity, ActivityAction, DownloadPermission, EntryDetails } from '@/utils/types/entry.type';
import { useQuery } from '@tanstack/react-query';
import { DriveLocationButton } from './DriveLocationButton';
import { classNames } from '@/components/core/drop-down/Dropdown';

type SidePanelProps = {};

const SidePanel: React.FC<SidePanelProps> = () => {
  const { entryId, icon, title, closeDrawer } = useDrawer();

  // fetch data
  const detailsQuery = useQuery({
    queryKey: ['entry', entryId],
    queryFn: () => wait(1000).then(() => getDetails(entryId!)),
  });
  const activitiesQuery = useQuery({
    queryKey: ['activities', entryId],
    queryFn: () => wait(1000).then(() => getActivities(entryId!)),
  });

  const details = detailsQuery.data;

  return (
    <div className='ml-4 flex h-full w-[336px] flex-col overflow-hidden'>
      <div className='flex w-full items-center justify-between px-6 py-4 pr-2'>
        <div className='flex items-center space-x-4'>
          <div className='h-6 w-6'>{details ? details.icon : <Icon icon='mdi:folder-mydrive' className='h-full w-full' />}</div>
          <div className='... truncate font-medium'>{details ? details.title : 'My Drive'}</div>
        </div>
        <Icon
          className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow'
          icon='ic:baseline-close'
          onClick={() => closeDrawer()}
        />
      </div>
      <Tab.Group>
        <Tab.List className='flex border-b border-[#cbcbcb]  pb-4'>
          <Tab className='flex basis-1/2 focus:outline-none'>
            {({ selected }) => (
              <div
                className={classNames(
                  'flex grow justify-center active:bg-[#c7d8f4]',
                  selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]',
                )}>
                <div
                  className={classNames(
                    'w-14 py-3 text-sm font-medium',
                    selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : '',
                  )}>
                  Details
                </div>
              </div>
            )}
          </Tab>
          <Tab className='flex basis-1/2 focus:outline-none'>
            {({ selected }) => (
              <div
                className={classNames(
                  'flex grow justify-center active:bg-[#c7d8f4]',
                  selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]',
                )}>
                <div
                  className={classNames(
                    'w-14 py-3 text-sm font-medium',
                    selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : '',
                  )}>
                  Activity
                </div>
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className='relative h-full w-full overflow-y-auto'>
          {details ? (
            <Tab.Panel>
              <div className='flex flex-col space-y-6 '>
                <div className='flex h-40 items-center justify-center'>{details.preview}</div>

                <div className='flex flex-col space-y-2 pl-4'>
                  <div className='font-medium'>Who has access</div>
                  <div className='flex flex-col'>
                    <Avatar alt={details.owner.username} src={details.owner.url} sx={{ width: 32, height: 32 }} />
                    <div className='flex h-8 items-center text-xs'>Private to you</div>
                  </div>
                  <div className='flex h-10 w-36 cursor-pointer items-center justify-center rounded-full border border-outline hover:bg-[#f5f8fd]'>
                    <div className='text-sm font-medium text-[#1a61d3]'>Manage Access</div>
                  </div>
                </div>

                <div className='border-t border-[#cbcbcb]'></div>
                <div className='flex flex-col gap-[0.5rem] pl-4'>
                  {details.isDir ? (
                    <div className='font-medium'>Folder details</div>
                  ) : (
                    <div className='font-medium'>File details</div>
                  )}
                  <div className='flex flex-col gap-[1.125rem]'>
                    <div>
                      <div className='text-xs font-medium'>Type</div>
                      <div className='text-sm'>Seeweed Drive Folder</div>
                    </div>
                    <div>
                      <div className='mb-1 text-xs font-medium'>Location</div>
                      {/* <div className='text-sm'>My Drive</div> */}
                      <DriveLocationButton label='My Drive' icon='drive' />
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Owner</div>
                      <div className='text-sm'>me</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Modified </div>
                      <div className='text-sm'>Jun 28, 2023 by me</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Opened </div>
                      <div className='text-sm'>Mar 28, 2024 by me</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Created </div>
                      <div className='text-sm'>Jun 28, 2023</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Download permissions</div>
                      <div className='text-sm'>Viewers can download</div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ) : (
            <DefaultTabPanel />
          )}
          <Tab.Panel>Activity</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const DefaultTabPanel: React.FC = () => {
  return <div>Select item to see the details</div>;
};

function getDetails(entryId: string): EntryDetails {
  return {
    id: 'id',
    isDir: true,
    title: 'title',
    icon: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
    preview: <div className='h-40 w-40 bg-gray-200'></div>,
    accessUsers: [
      { username: 'username', url: 'url' },
      { username: 'username', url: 'url' },
    ],
    owner: { username: 'username', url: 'url' },
    type: 'type',
    size: 'size',
    storageUsed: 'storageUsed',
    location: <div>location</div>,
    modified: new Date(),
    opened: new Date(),
    created: new Date(),
    downloadPermissions: DownloadPermission.DOWNLOAD,
  };
}

function getActivities(entryId: string): Activity[] {
  return [
    {
      id: 'id',
      action: ActivityAction.CREATE,
      actor: {
        username: 'daccong',
        url: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      },
      target: <div>target</div>,
      time: new Date(),
    },
    {
      id: 'id',
      action: ActivityAction.OPEN,
      actor: {
        username: 'daccong',
        url: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      },
      target: <div>target</div>,
      time: new Date(),
    },
  ];
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default SidePanel;
