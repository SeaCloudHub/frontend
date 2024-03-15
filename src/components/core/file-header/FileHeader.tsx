import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown from '../drop-down/FileMenu';
import Chip from '../chip/Chip';

type FileHeaderProps = {
  headerName: string;
};

const FileHeader: React.FC<FileHeaderProps> = ({ headerName }) => {
  const driveMenuItems = [
    [
      {
        label: 'New folder',
        icon: <Icon icon="ic:outline-create-new-folder" />,
      },
    ],
    [
      { label: 'File upload', icon: <Icon icon="ic:baseline-upload-file" /> },
      {
        label: 'Folder upload',
        icon: <Icon icon="mdi:folder-upload-outline" />,
      },
    ],
  ];
  const typeFilterItems = [
    [
      {
        label: 'Documents',
        icon: <Icon icon="simple-icons:googledocs" />,
      },
      {
        label: 'Spreadsheets',
        icon: <Icon icon="mdi:google-spreadsheet" />,
      },
      {
        label: 'Presentations',
        icon: <Icon icon="mdi:file-presentation-box" />,
      },
    ],
  ];
  const peopleFilterItems = [
    [
      {
        label: 'Documents',
        icon: <Icon icon="simple-icons:googledocs" />,
      },
      {
        label: 'Spreadsheets',
        icon: <Icon icon="mdi:google-spreadsheet" />,
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

  return (
    <div className="flex flex-col space-y-4 px-1 pb-2">
      <div className="text-textC flex items-center space-x-2 text-2xl">
        {/* // TODO: path here */}
        {/* {isNestedFolder && (
          <BsArrowLeftCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() =>{}}
          />
        )} */}
        <Dropdown
          button={
            <div className="flex cursor-pointer items-center justify-between rounded-full py-1 pb-2 pl-4 pr-3 hover:bg-surfaceDim">
              <h2>{headerName}</h2>
              <Icon icon="mdi:caret-down" />
            </div>
          }
          items={driveMenuItems}
          left={false}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 pl-4">
        <Chip name="Type" options={typeFilterItems} />
        <Chip name="People" options={peopleFilterItems} />
        <Chip name="Modified" options={modifiedFilterItems} />
      </div>
    </div>
  );
};

export default FileHeader;
