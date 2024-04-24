import { Icon } from '@iconify/react/dist/iconify.js';
import DrivePathButton from './DrivePathButton';
import DrivePathMenuButton from './DrivePathMenuButton';
import { Path } from '@/store/my-drive/myDrive.store';
import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';

type DrivePathProps = {
  path: Path;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

const DrivePath: React.FC<DrivePathProps> = ({ path, type }) => {
  console.log('[DrivePath] path: ', path);
  const navigate = useNavigate();
  if (path.length > 3) {
    const restDirs = path.slice(0, path.length - 2);
    const driveMenuItems: MenuItem[][] = [
      restDirs.map((d) => {
        const newPath = path.slice(0, path.indexOf(d) + 1);
        return {
          label: d.name,
          action: () => {
            console.log('[DrivePath] newPath: ', newPath);
            navigate(`${CUSTOMER_MY_DRIVE}/dir/${d.id}`);
          },
          icon: <Icon icon='ic:baseline-folder' />,
        };
      }),
    ];

    return (
      <div className='flex items-center pl-1'>
        {/* more */}
        {/* <Dropdown
          button={
            <div className='flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#ededed]'>
              <Icon icon='ic:baseline-more-horiz' className='h-6 w-6' />
            </div>
          }
          left={false}
          items={driveMenuItems}
        /> */}
        <Dropdown
          button={
            <div className='flex items-center justify-center rounded-full hover:bg-[#ededed]'>
              <Icon icon='ic:baseline-more-horiz' className='h-6 w-6' />
            </div>
          }
          items={driveMenuItems}
          left={false}
        />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathButton id={path[path.length - 2].id} name={path[path.length - 2].name} />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathMenuButton dirName={path[path.length - 1].name} dirId={path[path.length - 1].id} type={type} />
      </div>
    );
  }

  return (
    <div className='flex items-center'>
      {path.map((d, index) => {
        if (index === path.length - 1) {
          return type === 'MyDrive' ? (
            <DrivePathMenuButton dirName={d.name} dirId={d.id} key={d.id} type={type} />
          ) : (
            <DrivePathButton id={d.id} name={d.name} key={d.id} />
          );
        }
        const curPath = path.slice(0, index + 1);
        return (
          <div className='flex items-center' key={d.id}>
            <DrivePathButton id={d.id} name={d.name} />
            <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
          </div>
        );
      })}
    </div>
  );
};

export default DrivePath;
