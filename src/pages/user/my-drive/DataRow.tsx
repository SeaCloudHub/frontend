import Dropdown from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { MyEntry, useDrawer } from './MyDrive';

/**
 * Map processed Entry to row
 */
export const DataRow: React.FC<MyEntry> = ({ isDir, title, icon, lastModified, owner, size }) => {
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const fileOps = [
    [{ label: 'Preview', icon: <Icon icon='material-symbols:visibility' /> }],
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' /> },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
      },
      {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' /> },
      { label: 'Share', icon: <Icon icon='lucide:user-plus' /> },
    ],
    [
      { label: 'Move', icon: <Icon icon='mdi:folder-move-outline' /> },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' /> },
      { label: 'Lock', icon: <Icon icon='mdi:lock-outline' /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' /> }],
  ];
  const folderOps = [
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' /> },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' /> },
      { label: 'Share', icon: <Icon icon='lucide:user-plus' /> },
    ],
    [
      { label: 'Move', icon: <Icon icon='mdi:folder-move-outline' /> },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' /> }],
  ];

  // const [showTools, setShowTools] = useState(false);
  return (
    <div className='py= flex items-center border-b py-1.5 hover:bg-surfaceContainer'>
      <div className='flex flex-1 basis-72 items-center text-sm font-medium'>
        <div className='px-4'>
          <div className='h-6 w-6'>{icon}</div>
        </div>
        <div>{title}</div>
      </div>
      <div className='basis-64 text-sm font-normal max-2xl:basis-36 max-lg:hidden'>{owner}</div>
      <div className='basis-48 text-sm font-normal max-2xl:shrink max-md:hidden'>{lastModified}</div>
      <div className='basis-20 text-sm font-normal max-xl:hidden'>{size}</div>
      <div className='flex basis-48 justify-end max-2xl:basis-12'>
        {/* removed because of lagging */}
        {/* <div
              className={classNames('flex', showTools ? 'visible' : 'invisible')}
            >
              <Icon
                className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
                icon="lucide:user-plus"
              />
              <Icon
                className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
                icon="ic:outline-file-download"
              />
              <Icon
                className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
                icon="ic:round-drive-file-rename-outline"
              />
              <Icon
                className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
                icon="material-symbols:star-outline"
              />
            </div> */}
        <Dropdown
          button={<Icon icon='ic:baseline-more-vert' className='h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow' />}
          items={isDir ? folderOps : fileOps}
          left={true}
        />
      </div>
    </div>
  );
};
