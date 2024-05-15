import { classNames } from '@/components/core/drop-down/Dropdown';
import { useEntryAccess, useEntryMetadata } from '@/hooks/drive.hooks';
import { useSession } from '@/store/auth/session';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { numToSize } from '@/utils/function/numbertToSize';
import { Tab } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { DriveLocationButton } from './DriveLocationButton';
import SidePanelAction from './SidePanelAction';
import { useStorageStore } from '@/store/storage/storage.store';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { downloadFileApi } from '@/apis/user/storage/storage.api';

type SidePanelProps = {
  id?: string;
  title?: string;
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
  const { closeDrawer } = useDrawer();
  const identity = useSession((state) => state.identity);
  const { data: details, isLoading, isFetching } = useEntryMetadata(id);
  const { data: access, isLoading: isLoadingAccess } = useEntryAccess(id);
  const { rootId } = useStorageStore();

  const tabs = ['Details', 'Activity'];

  // const { data: imageUrl, error } = useQuery({
  //   queryKey: ['image', id],
  //   queryFn: async () => {
  //     const res = await downloadFileApi(id);
  //     console.log(res);
  //     const blob = new Blob([res.data], { type: res.headers['content-type'] });
  //     const url = URL.createObjectURL(blob);
  //     return url;
  //   },
  //   enabled:
  //     details &&
  //     !isLoading &&
  //     (details.mime_type === 'image/png' || details.mime_type === 'image/jpg' || details.mime_type === 'image/jpeg'),
  // });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  // console.log('[SidePanel] imageUrl', imageUrl);

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const getUrl = async () => {
      try {
        const res = await downloadFileApi(id);
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        if (isAxiosError<ApiGenericError>(error)) {
          toast.error(error.response?.data.message, toastError());
        }
      }
    };

    if (
      details &&
      !isLoading &&
      (details.mime_type === 'image/png' || details.mime_type === 'image/jpg' || details.mime_type === 'image/jpeg')
    ) {
      getUrl();
    } else {
      setImageUrl(null);
    }
  }, [details, isLoading, id]);

  console.log('[SidePanel] detail', details)

  return (
    <div className='flex h-full w-[360px] flex-col overflow-hidden border-l'>
      <div className='mb-4 mt-6 flex min-h-9 w-full items-center justify-between px-6 pr-2'>
        {id ? (
          <div className='flex items-center space-x-4'>
            <div className='w-6'>
              {details ? details.icon : <Icon icon='mdi:folder-google-drive' className='h-full w-full' />}
            </div>
            <div className='text-wrap font-medium'>{!isLoading ? (details ? details.name : title) : title}</div>
          </div>
        ) : (
          <div></div>
        )}
        <Icon
          className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow dark:hover:bg-slate-400 dark:active:brightness-90'
          icon='ic:baseline-close'
          onClick={() => closeDrawer()}
        />
      </div>
      {id ? (
        <Tab.Group>
          <Tab.List className='flex border-b border-[#cbcbcb] pb-4'>
            {tabs.map((tab, index) => (
              <Tab key={index} className='flex basis-1/2 focus:outline-none'>
                {({ selected }) => (
                  <div
                    className={classNames(
                      'flex grow justify-center active:bg-[#c7d8f4] dark:hover:bg-blue-950',
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
                  <div className='flex w-full items-center justify-center'>
                    {imageUrl ? <img src={imageUrl} alt={title} className='h-full w-full object-cover' /> : details.preview}
                  </div>

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
                        <DriveLocationButton
                          label={details.location.id === rootId ? 'My Drive' : details.location.name}
                          icon='drive'
                        />
                      </div>
                      <div>
                        <div className='text-xs font-medium'>Owner</div>
                        <div className='text-sm'>{details.owner.username === identity.id ? ' me ' : details.owner.username}</div>
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
      ) : (
        <DefaultTabPanel />
      )}
    </div>
  );
};

const DefaultTabPanel: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <img className='mb-4 h-60 w-full object-cover' src={(import.meta.env.BASE_URL + 'guide1.png') as string} alt='Guide1' />
      <div>Select item to see the details</div>
    </div>
  );
};

export default SidePanel;
