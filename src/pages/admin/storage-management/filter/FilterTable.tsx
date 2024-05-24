import { Path } from '@/store/my-drive/myDrive.store';
import { FilerRow } from './FilerRow';
import { UserRole } from '@/utils/types/user-role.type';

type FilerTableProps = {
  data: FilerDataDto[];
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
};

export type FilerDataDto = {
  id: string;
  is_dir: boolean;
  name: string;
  type?: string;
  size?: number;
  created: Date;
  is_root?: boolean;
  userRoles?: UserRole[];
};

export const FilerTable: React.FC<FilerTableProps> = ({ data, setPath }) => {
  return (
    <div className='relative flex flex-col'>
      <div className='grid grid-cols-9 gap-3 border-b border-b-[#dadce0] py-1 max-[1160px]:grid-cols-6'>
        <div className='col-span-3 font-medium'>Name</div>
        <div className='col-span-2'></div>
        <div className='flex justify-end font-medium'>File type</div>
        <div className='truncate text-end font-medium max-[1000px]:hidden'>Size</div>
        <div className='font-medium'>Created</div>
        <div className=''></div>
      </div>

      {data.map((item) => (
        <FilerRow
          key={item.id}
          data={item}
          onDoubleClick={() => {
            setPath && setPath((prev) => [...prev, { id: item.id, name: item.name }]);
          }}
        />
      ))}
    </div>
  );
};
