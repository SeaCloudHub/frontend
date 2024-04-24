import { Path } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';
import { useNavigate } from 'react-router-dom';

type DrivePathButtonProps = {
  id: string;
  name: string;
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ id, name }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
      onClick={() => (id === rootId ? navigate(`${CUSTOMER_MY_DRIVE}`) : navigate(`${CUSTOMER_MY_DRIVE}/dir/${id}`))}>
      <div className='pb-1 text-2xl'>{name}</div>
    </div>
  );
};

export default DrivePathButton;
