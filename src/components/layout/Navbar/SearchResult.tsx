import { AiFillFolder } from 'react-icons/ai';
import fileTypeIcons from '../../../utils/constants/file-icons.constant';

type SearchResult = {
  data?: any[];
};
const SearchResult = ({ data }: SearchResult) => {
  return (
    <div
      className='border-textC shadow-darkC absolute z-10 max-h-64 w-full overflow-x-hidden
      rounded-b-2xl border-t-[1.5px] bg-white pt-2 shadow-md'>
      <div className='border-b  py-3'>
        {!data || (data.length < 1 && <div className='pl-5 text-sm text-gray-500'>No result match your search.</div>)}
        {data &&
          data.length > 1 &&
          data.map((item, index) => {
            const icon = fileTypeIcons[item.fileExtension as keyof typeof fileTypeIcons] ?? fileTypeIcons['any'];
            return (
              <div
                key={index}
                onClick={() => {}}
                className='hover:bg-darkC2 flex w-full cursor-pointer items-center space-x-3.5 border-blue-700 px-4 py-2 hover:border-l-2'>
                <span className='h-6 w-6'>{item.isFolder ? <AiFillFolder className='text-textC h-full w-full' /> : icon}</span>
                <span className='w-full truncate'>{item.fileName || item.folderName}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
