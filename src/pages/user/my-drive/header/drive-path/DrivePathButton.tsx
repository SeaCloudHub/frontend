import { Path } from '@/store/my-drive/myDrive.store';
import { CUSTOMER_HOME } from '@/utils/constants/router.constant';
import { useNavigate } from 'react-router-dom';

type DrivePathButtonProps = {
  name: string;
  id: string;
};

// button of drive path
const DrivePathButton: React.FC<DrivePathButtonProps> = ({ name, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
      onClick={() => navigate(`${CUSTOMER_HOME}/my-drive/${id}`)}>
      <div className='pb-1 text-2xl'>{name}</div>
    </div>
  );
};

export default DrivePathButton;
