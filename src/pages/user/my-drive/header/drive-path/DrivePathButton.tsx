import { Path, useCursor, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { DRIVE_MY_DRIVE, DRIVE_PRIORITY, DRIVE_SHARED, DRIVE_STARRED } from '@/utils/constants/router.constant';
import { useNavigate } from 'react-router-dom';

type DrivePathButtonProps = {
  id: string;
  name: string;
  // setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ id, name, type }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  const { resetCursor } = useCursor();
  const { setListEntries } = useEntries();
  const { setArrSelected } = useSelected();

  const navigateLink = (type: string) => {
    switch (type) {
      case 'Shared':
        return `${DRIVE_SHARED}`;
      case 'Starred':
        return `${DRIVE_STARRED}`;
      case 'Priority':
        return `${DRIVE_PRIORITY}`;
      default:
        return `${DRIVE_MY_DRIVE}`;
    }
  };

  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
      onClick={() => {
        setArrSelected && setArrSelected([]);
        setListEntries([]);
        // resetLimit();
        resetCursor();
        id === rootId ? navigate(navigateLink(type)) : navigate(`${DRIVE_MY_DRIVE}/dir/${id}`);
      }}>
      <div className='pb-1 text-2xl'>{name}</div>
    </div>
  );
};

export default DrivePathButton;
