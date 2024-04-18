import { classNames } from '@/components/core/drop-down/Dropdown';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { Activity, ActivityAction, DownloadPermission, EntryDetails } from '@/utils/types/entry.type';
import { Tab } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Avatar, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { DriveLocationButton } from './DriveLocationButton';
import SidePanelAction from './SidePanelAction';
import { useEntryAccess, useEntryMetadata } from '@/hooks/drive.hooks';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { useSession } from '@/store/auth/session';
import { numToSize } from '@/utils/function/numbertToSize';

type SidePanelProps = {
  id: string;
  title: string;
};

const fakeDataSidePanelAction = [
  {
    time: new Date(),
    data: [
      {
        action: 'created',
        timeAction: new Date(),
        actor: { name: 'daccong', avatar: 'https://picsum.photos/200/300' },
        // root: { id: 'id', title: 'root' },
        entry: [
          { id: 'id', title: 'entry.pdf' },
          { id: 'id', title: 'entry.docx' },
        ],
      },
      {
        action: 'opened',
        timeAction: new Date(),
        actor: { name: 'daccong', avatar: 'https://picsum.photos/200/300' },
        root: { id: 'id', title: 'root' },
        entry: [
          { id: 'id', title: 'entry' },
          { id: 'id', title: 'entry' },
        ],
      },
    ],
  },
  {
    time: new Date(),
    data: [
      {
        action: 'created',
        timeAction: new Date(),
        actor: { name: 'daccong', avatar: 'https://picsum.photos/200/300' },
        root: { id: 'id', title: 'root asdfasd addfasdf dsgsdg dfasf' },
        entry: [
          { id: 'id', title: 'entry 111111 111111111 1111111111 11111111111' },
          { id: 'id', title: 'entry' },
        ],
      },
      {
        action: 'opened',
        timeAction: new Date(),
        actor: { name: 'daccong', avatar: 'https://picsum.photos/200/300' },
        root: { id: 'id', title: 'root' },
        entry: [
          { id: 'id', title: 'entry' },
          { id: 'id', title: 'entry' },
        ],
      },
    ],
  },
];

const SidePanel: React.FC<SidePanelProps> = ({ id, title }) => {
  console.log('[SidePanel] id:', id);
  const { closeDrawer } = useDrawer();
  const { user_id: userId } = useSession();

  const { data: details, isLoading } = useEntryMetadata(id);
  const { data: access, isLoading: isLoadingAccess } = useEntryAccess(id);

  const tabs = ['Details', 'Activity'];

  return (
    <div className='ml-4 flex h-full w-[336px] flex-col overflow-hidden'>
      <div className='mb-4 mt-6 flex h-9 w-full items-center justify-between px-6 pr-2'>
        <div className='flex items-center space-x-4'>
          <div className='w-6'>{details ? details.icon : <Icon icon='mdi:folder-google-drive' className='h-full w-full' />}</div>
          <div className='... truncate font-medium'>{title}</div>
        </div>
        <Icon
          className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow'
          icon='ic:baseline-close'
          onClick={() => closeDrawer()}
        />
      </div>
      <Tab.Group>
        <Tab.List className='flex border-b border-[#cbcbcb] pb-4'>
          {tabs.map((tab, index) => (
            <Tab key={index} className='flex basis-1/2 focus:outline-none'>
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
                    {tab}
                  </div>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='relative h-full w-full overflow-y-auto'>
          <Tab.Panel>
            {isLoading ? (
              <LinearProgress className=' translate-y-1' />
            ) : details ? (
              <div className='flex flex-col space-y-6 '>
                <div className='flex h-40 items-center justify-center'>{details.preview}</div>

                <div className='flex flex-col space-y-2 pl-4'>
                  <div className='font-medium'>Who has access</div>
                  <div className='flex flex-col'>
                    {isLoadingAccess ? 'Loading...' : access ? access.whoHasAccess : 'N/a'}
                    {/* <Avatar alt={details.owner.username} src={details.owner.url} sx={{ width: 32, height: 32 }} />
                    <div className='flex h-8 items-center text-xs'>Private to you</div> */}
                  </div>
                  <div className='flex h-10 w-36 cursor-pointer items-center justify-center rounded-full border border-outline hover:bg-[#f5f8fd]'>
                    <div className='text-sm font-medium text-[#1a61d3]'>Manage Access</div>
                  </div>
                </div>

                <div className='border-t border-[#cbcbcb]'></div>
                <div className='flex flex-col gap-[0.5rem] pl-4'>
                  <div className='font-medium'>{details.is_dir ? 'Folder details' : 'File details'}</div>
                  <div className='flex flex-col gap-[1.125rem]'>
                    <div>
                      <div className='text-xs font-medium'>Type</div>
                      <div className='text-sm'>{details.type}</div>
                    </div>
                    {!details.is_dir && (
                      <div>
                        <div className='text-xs font-medium'>Size</div>
                        <div className='text-sm'>{numToSize(details.size)}</div>
                      </div>
                    )}
                    {!details.is_dir && (
                      <div>
                        <div className='text-xs font-medium'>Storage used </div>
                        <div className='text-sm'>{numToSize(details.size)}</div>
                      </div>
                    )}
                    <div>
                      <div className='mb-1 text-xs font-medium'>Location</div>
                      <DriveLocationButton label={details.location.name} icon='drive' />
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Owner</div>
                      <div className='text-sm'>{details.owner.username === userId ? ' me ' : details.owner.username}</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Modified </div>
                      <div className='text-sm'>
                        {details.modified.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'Asia/Ho_Chi_Minh',
                        }) +
                          ' by ' +
                          'N/a'}
                      </div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Opened </div>
                      <div className='text-sm'>{details.opened}</div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Created </div>
                      <div className='text-sm'>
                        {details.created.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'Asia/Ho_Chi_Minh',
                        }) +
                          ' by ' +
                          'N/a'}
                      </div>
                    </div>
                    <div>
                      <div className='text-xs font-medium'>Download permissions</div>
                      <div className='text-sm'>{details.download_perm}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DefaultTabPanel />
            )}
          </Tab.Panel>
          <Tab.Panel>
            <SidePanelAction data={fakeDataSidePanelAction} />
          </Tab.Panel>
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
        url: 'https://picsum.photos/200/300',
      },
      target: <div>target</div>,
      time: new Date(),
    },
    {
      id: 'id',
      action: ActivityAction.OPEN,
      actor: {
        username: 'daccong',
        url: 'https://picsum.photos/200/300',
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
