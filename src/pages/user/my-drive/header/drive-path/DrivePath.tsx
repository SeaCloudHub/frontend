import { Icon } from '@iconify/react/dist/iconify.js';
import DrivePathButton from './DrivePathButton';
import DrivePathMenuButton from './DrivePathMenuButton';
import { Path } from '@/store/my-drive/myDrive.store';
import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';

type DrivePathProps = {
  path: Path;
};

const DrivePath: React.FC<DrivePathProps> = ({ path }) => {
  if (path.length > 3) {
    const restDirs = path.slice(0, path.length - 2);
    const driveMenuItems: MenuItem[][] = [
      restDirs.map((d) => {
        const newPath = path.slice(0, path.indexOf(d) + 1);
        return {
          label: d.name,
          action: () => {
            console.log('[DrivePath] newPath: ', newPath);
            // setPath(newPath);
          },
          icon: <Icon icon='ic:baseline-folder' />,
        };
      }),
    ];

    return (
      <div className='flex items-center pl-1'>
        {/* more */}
        <Dropdown
          button={
            <div className='flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#ededed]'>
              <Icon icon='ic:baseline-more-horiz' className='h-6 w-6' />
            </div>
          }
          left={false}
          items={driveMenuItems}
        />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathButton name={path[path.length - 2].name} id={path[path.length - 2].id} />
        <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
        <DrivePathMenuButton dirName={path[path.length - 1].name} entryId={path[path.length - 1].id} />
      </div>
    );
  }

  return (
    <div className='flex items-center'>
      {path.map((d, index) => {
        if (index === path.length - 1) {
          return <DrivePathMenuButton dirName={d.name} entryId={d.id} key={d.id} />;
        }
        const curPath = path.slice(0, index + 1);
        return (
          <div className='flex items-center' key={d.id}>
            <DrivePathButton name={curPath[curPath.length - 1].name} id={curPath[curPath.length - 1].id} />
            <Icon icon='ic:baseline-keyboard-arrow-right' className='h-6 w-6' />
          </div>
        );
      })}
    </div>
  );
};

export default DrivePath;
