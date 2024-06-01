import { AiFillFolder } from 'react-icons/ai';
import fileTypeIcons from '../../../utils/constants/file-icons.constant';
import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useStorageStore } from '@/store/storage/storage.store';
import { DRIVE_MY_DRIVE, DRIVE_SHARED } from '@/utils/constants/router.constant';

type SearchResultProps = {
  data?: SuggestedEntry[];
  error?: string;
  loading?: boolean;
  onSelected?: () => void;
};
const SearchResult: React.FC<SearchResultProps> = ({ data, loading, onSelected, error }) => {
  const navigate = useNavigate();
  const { rootId } = useStorageStore();

  return loading ? (
    <LinearProgress className='translate-y-1' />
  ) : (
    <div
      className='border-textC shadow-darkC absolute z-10 w-full overflow-x-hidden
      rounded-b-2xl border-t-[1.5px] bg-white pt-2 shadow-md dark:bg-search-bg-dark'>
      <div className='mb-3 max-h-64 overflow-y-auto py-3'>
        {error ? (
          <div className='pl-5 text-sm text-red-500'>{error}</div>
        ) : (
          <>
            {!data || (data.length < 1 && <div className='pl-5 text-sm text-gray-500'>No result match your search.</div>)}
            {data &&
              data.length > 1 &&
              data.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelected && onSelected();
                    console.log('item', item);
                    const paths = item.parent.path.split('/');
                    console.log('paths[1] === rootId', paths[1], rootId);
                    console.log('paths[1] === "" && item.id === rootId', paths[1] === '', item.id , rootId);
                    if(!item.isDir) {
                      navigate(`/drive/file/${item.id}`);
                      return;
                    }
                    if(paths[1] === rootId || (paths[1] === '' && item.parent.id === rootId)) {
                      paths.length > 2 ? navigate(`${DRIVE_MY_DRIVE}/dir/${item.id}`) : navigate(DRIVE_MY_DRIVE);
                    } else {
                      paths.length > 2 ? navigate(`/drive/folder/${item.id}`) : navigate(DRIVE_SHARED);
                    }
                  }}
                  className='flex w-full cursor-pointer items-center space-x-3.5 border-blue-700 px-4 py-2 hover:border-l-2 hover:bg-[#dfe3e7] dark:hover:bg-slate-700'>
                  <span className='h-6 w-6'>{item.isDir ? <AiFillFolder className='text-textC h-full w-full' /> : item.icon}</span>
                  <span className='w-full truncate'>{item.title}</span>
                </div>
              ))
            }
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
