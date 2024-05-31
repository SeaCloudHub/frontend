import { Icon } from '@iconify/react/dist/iconify.js';
import DrivePathButton from './DrivePathButton';
import DrivePathMenuButton from './DrivePathMenuButton';
import { Path, useCursor, useCursorActivity, useSelected } from '@/store/my-drive/myDrive.store';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import { useNavigate } from 'react-router-dom';
import { DRIVE_MY_DRIVE, DRIVE_SHARED, DRIVE_SHARED_DIR } from '@/utils/constants/router.constant';
import { useStorageStore } from '@/store/storage/storage.store';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { UserRole } from '@/utils/types/user-role.type';
import { isPermission } from '@/utils/function/permisstion.function';

type DrivePathProps = {
  path: { id: string; name: string; userRoles: UserRole[]; is_starred: boolean }[];
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

const DrivePath: React.FC<DrivePathProps> = ({ path, type }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  const { setArrSelected } = useSelected();
  // const { resetLimit } = useLimit();
  const { resetCursor } = useCursor();
  const { resetCursorActivity } = useCursorActivity();

  if (path.length > 3) {
    const restDirs = path.slice(0, path.length - 2);
    const driveMenuItems: MenuItem[][] = [
      restDirs.map((d) => {
        const newPath = path.slice(0, path.indexOf(d) + 1);
        return {
          label: d.name,
          action: () => {
            setArrSelected([]);
            resetCursor();
            resetCursorActivity();
            if (isPermission(d.userRoles) <= 2)
              d.id === rootId ? navigate(`${DRIVE_SHARED}`) : navigate(`/drive/folder/${DRIVE_SHARED_DIR}`);
            d.id === rootId ? navigate(`${DRIVE_MY_DRIVE}`) : navigate(`${DRIVE_MY_DRIVE}/dir/${d.id}`);
          },
          icon: <Icon icon='ic:baseline-folder' />,
        };
      }),
    ];

    return (
      <div className='flex items-center pl-1'>
        <CustomDropdown
          button={
            <div className='flex items-center justify-center rounded-full hover:bg-[#ededed]'>
              <Icon icon='ic:baseline-more-horiz' className='h-6 w-6' />
            </div>
          }
          items={driveMenuItems}
        />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathButton type={type} path={path[path.length - 2]} />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathMenuButton
          path={path[path.length - 1]}
          type={type}
          location={{ id: path[path.length - 2].id, name: path[path.length - 2].name }}
        />
      </div>
    );
  }

  return (
    <div className='flex select-none items-center'>
      {path.map((d, index) => {
        if (index === path.length - 1) {
          return isPermission(d.userRoles) >= 1 ? (
            <DrivePathMenuButton
              path={path[path.length - 1]}
              key={d.id}
              type={type}
              location={
                path.length > 1
                  ? { id: path[path.length - 2].id, name: path[path.length - 2].name }
                  : { id: rootId, name: 'My Drive' }
              }
            />
          ) : (
            <DrivePathButton path={d} key={d.id} type={type} />
          );
        }
        return (
          <div className='flex items-center' key={d.id}>
            <DrivePathButton path={d} key={index} type={type} />
            <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
          </div>
        );
      })}
    </div>
  );
};

export default DrivePath;
