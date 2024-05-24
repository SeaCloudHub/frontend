import { AiFillFolder } from 'react-icons/ai';
import fileTypeIcons from '../../../utils/constants/file-icons.constant';
import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type SearchResult = {
  data?: LocalEntry[];
  loading?: boolean;
  onFocused?: boolean;
};
const SearchResult = ({ data, loading, onFocused }: SearchResult) => {
  console.log(loading);
  const navigate = useNavigate();

  return (
    loading ?  <LinearProgress className='translate-y-1' /> :
    <div
      className='border-textC shadow-darkC absolute z-10 w-full overflow-x-hidden
      rounded-b-2xl border-t-[1.5px] bg-white pt-2 shadow-md dark:bg-search-bg-dark'>
      <div className='mb-3 max-h-64 overflow-y-auto py-3'>
        {!data || (data.length < 1 && <div className='pl-5 text-sm text-gray-500'>No result match your search.</div>)}
        {data &&
          data.length > 1 &&
          data.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                const link = `/drive/${item.isDir?'folder':'file'}/${item.id}`;
                navigate(link);
              }}
              className='hover:bg-slate-700 flex w-full cursor-pointer items-center space-x-3.5 border-blue-700 px-4 py-2 hover:border-l-2'
            >
              <span className='h-6 w-6'>{item.isDir ? <AiFillFolder className='text-textC h-full w-full' /> : item.icon}</span>
              <span className='w-full truncate'>{item.title}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchResult;
