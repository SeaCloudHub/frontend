import { Path, useCursor, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { DRIVE_MY_DRIVE, DRIVE_PRIORITY, DRIVE_SHARED, DRIVE_STARRED } from '@/utils/constants/router.constant';
import { isPermission } from '@/utils/function/permisstion.function';
import { UserRole } from '@/utils/types/user-role.type';
import { useNavigate } from 'react-router-dom';

type DrivePathButtonProps = {
  // id: string;
  // name: string;
  // userRoles: UserRole[];
  path: { id: string; name: string; userRoles: UserRole[] };
  // setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ type, path }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  const { resetCursor } = useCursor();
  const { setListEntries } = useEntries();
  const { setArrSelected } = useSelected();

  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed] hover:dark:bg-slate-500'
      onClick={() => {
        setArrSelected && setArrSelected([]);
        setListEntries([]);
        resetCursor();
        console.log('path', path, rootId);
        if (type === 'Shared') path.id === rootId ? navigate(`${DRIVE_SHARED}`) : navigate(`/drive/folder/${path.id}`);
        else path.id === rootId ? navigate(`${DRIVE_MY_DRIVE}`) : navigate(`${DRIVE_MY_DRIVE}/dir/${path.id}`);
      }}>
      <div className='min-w-20 truncate pb-1 text-2xl'>{path.name}</div>
    </div>
  );
};

export default DrivePathButton;
