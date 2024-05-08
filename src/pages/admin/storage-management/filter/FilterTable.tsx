import { FilerRow } from './FilerRow';

type FilerTableProps = {
  data: FilerDataType[];
};

export type FilerDataType = {
  id: string;
  is_dir: boolean;
  name: string;
  type?: string;
  size?: number;
  created: Date;
};

export const FilerTable: React.FC<FilerTableProps> = ({ data }) => {
  return (
    <div className='relative flex flex-col'>
      <div className='grid grid-cols-9 gap-3 border-b border-b-[#dadce0] py-1 max-[1160px]:grid-cols-6'>
        <div className='col-span-5 font-medium'>Name</div>
        <div className='font-medium'>File type</div>
        <div className='truncate font-medium max-[1000px]:hidden'>Size</div>
        <div className='font-medium'>Created</div>
        <div className=''></div>
      </div>

      {data.map((item) => (
        <FilerRow key={item.id} data={item} />
      ))}
    </div>
  );
};
