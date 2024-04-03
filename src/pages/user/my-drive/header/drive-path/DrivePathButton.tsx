import { Path } from '@/store/my-drive/myDrive.store';

type DrivePathButtonProps = {
  path: Path;
  setPath: (path: Path) => void;
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ path, setPath }) => {
  const dirName = path[path.length - 1].name;
  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
      onClick={() => setPath(path)}>
      <div className='pb-1 text-2xl'>{dirName}</div>
    </div>
  );
};

export default DrivePathButton;
