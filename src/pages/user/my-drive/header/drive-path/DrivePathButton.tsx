import { Path } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { CUSTOMER_MY_DRIVE, CUSTOMER_PRIORITY, CUSTOMER_SHARED, CUSTOMER_STARRED } from '@/utils/constants/router.constant';
import { useNavigate } from 'react-router-dom';

type DrivePathButtonProps = {
  id: string;
  name: string;
  setSelected?: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ id, name, setSelected, type }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();

  const navigateLink = (type: string) => {
    switch (type) {
      case 'Shared':
        return `${CUSTOMER_SHARED}`;
      case 'Starred':
        return `${CUSTOMER_STARRED}`;
      case 'Priority':
        return `${CUSTOMER_PRIORITY}`;
      default:
        return `${CUSTOMER_MY_DRIVE}`;
    }
  };

  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
      onClick={() => {
        id === rootId ? navigate(navigateLink(type)) : navigate(`${CUSTOMER_MY_DRIVE}/dir/${id}`);
        setSelected && setSelected({ id, name });
      }}>
      <div className='pb-1 text-2xl'>{name}</div>
    </div>
  );
};

export default DrivePathButton;
