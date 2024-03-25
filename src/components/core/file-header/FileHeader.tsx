import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown from '../drop-down/Dropdown';
import FilterChip from '../filter-chip/FilterChip';
import { useViewMode } from '@/pages/user/my-drive/MyDrive';

type FileHeaderProps = {
  headerName: string;
};

const FileHeader: React.FC<FileHeaderProps> = ({ headerName }) => {
  const driveMenuItems = [
    [
      {
        label: 'New folder',
        icon: <Icon icon='ic:outline-create-new-folder' />,
      },
    ],
    [
      { label: 'File upload', icon: <Icon icon='ic:baseline-upload-file' /> },
      {
        label: 'Folder upload',
        icon: <Icon icon='mdi:folder-upload-outline' />,
      },
    ],
  ];
  const typeFilterItems = [
    [
      {
        label: 'Documents',
        icon: <Icon icon='simple-icons:googledocs' />,
      },
      {
        label: 'Spreadsheets',
        icon: <Icon icon='mdi:google-spreadsheet' />,
      },
      {
        label: 'Presentations',
        icon: <Icon icon='mdi:file-presentation-box' />,
      },
    ],
  ];
  const peopleFilterItems = [
    [
      {
        label: 'Documents',
        icon: <Icon icon='simple-icons:googledocs' />,
      },
      {
        label: 'Spreadsheets',
        icon: <Icon icon='mdi:google-spreadsheet' />,
      },
    ],
  ];
  const modifiedFilterItems = [
    [
      { label: 'Today', icon: null },
      { label: 'Last 7 days', icon: null },
      { label: 'This year (2024)', icon: null },
      { label: 'Last year (2023)', icon: null },
      { label: 'Custom day range', icon: null },
    ],
  ];
  const sortItems = [
    [
      { label: 'Name', icon: null },
      { label: 'Last modified', icon: null },
      { label: 'Last modified by me', icon: null },
      { label: 'Last opened by me', icon: null },
    ],
  ];

  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className='flex flex-col space-y-4 px-1 pb-2'>
      <div className='flex justify-between pr-8'>
        <div className='flex items-center space-x-2 text-2xl'>
          {/* // TODO: display path here */}
          {/* {isNestedFolder && (
          <BsArrowLeftCircle
          className="h-6 w-6 cursor-pointer"
          onClick={() =>{}}
          />
        )} */}
          <Dropdown
            button={
              <div className='flex cursor-pointer items-center justify-between rounded-full py-1 pb-2 pl-4 pr-3 hover:bg-surfaceDim'>
                <h2>{headerName}</h2>
                <Icon icon='mdi:caret-down' />
              </div>
            }
            items={driveMenuItems}
            left={false}
          />
        </div>
        {viewMode === 'grid' ? (
          <div className='flex cursor-pointer items-center'>
            <div
              onClick={() => {
                setViewMode('list');
              }}
              className='flex w-16 items-center justify-center rounded-l-full border border-outline py-1 pl-1 hover:bg-surfaceContainer'>
              <Icon icon='ic:baseline-view-headline' className='h-6 w-6' />
            </div>
            <div className='flex w-16 items-center justify-center rounded-r-full border border-outline bg-primaryContainer py-1 pr-1 hover:brightness-90'>
              <Icon icon='ic:baseline-check' className='h-4 w-4' />
              <Icon icon='mdi:view-grid-outline' className='h-6 w-6' />
            </div>
          </div>
        ) : (
          <div className='flex cursor-pointer items-center'>
            <div className='flex w-16 items-center justify-center rounded-l-full border border-outline bg-primaryContainer py-1 pl-1 hover:brightness-90'>
              <Icon icon='ic:baseline-check' className='h-4 w-4' />
              <Icon icon='ic:baseline-view-headline' className='h-6 w-6' />
            </div>
            <div
              onClick={() => {
                setViewMode('grid');
              }}
              className='flex w-16 items-center justify-center rounded-r-full border border-outline py-1 pr-1 hover:bg-surfaceContainer'>
              <Icon icon='mdi:view-grid-outline' className='h-6 w-6' />
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-between pl-4 pr-8'>
        <div className='flex flex-wrap items-center gap-2'>
          <FilterChip name='Type' options={typeFilterItems} />
          <FilterChip name='People' options={peopleFilterItems} />
          <FilterChip name='Modified' options={modifiedFilterItems} />
        </div>
        <div className='flex flex-row items-center'>
          <div className='mr-2 rounded-full p-2 hover:bg-surfaceContainer active:bg-surfaceDim'>
            <Icon icon='mdi:arrow-down' className='text-lg' />
          </div>
          <Dropdown
            button={
              <button className='border-1 flex cursor-pointer items-center space-x-2 rounded-lg border border-outline px-4 py-1 text-sm font-medium hover:bg-surfaceContainer active:bg-surfaceDim'>
                <span>Name</span>
                <Icon icon='mdi:caret-down' />
              </button>
            }
            items={sortItems}
            left={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FileHeader;
