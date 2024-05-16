import ModalSearchAdvanced from '@/components/core/modal/ModalSearchAdvanced';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/providers/theme-provider';
import { useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchResult from './SearchResult';
import { useSearchEntries } from '@/hooks/drive.hooks';
import { useNavigate } from 'react-router-dom';
import { DRIVE_SEARCH } from '@/utils/constants/router.constant';
import { useEntries, useLimit } from '@/store/my-drive/myDrive.store';
import { useSession } from '@/store/auth/session';

function Search() {
  const identity = useSession((state) => state.identity);
  const [keyWord, setKeyWord] = useState<string>('');
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { submited, setSubmited } = useEntries();
  const { resetLimit } = useLimit();

  const searchValue = useDebounce({ delay: 260, value: keyWord });
  const {data, isLoading, refetch} = useSearchEntries(searchValue);
  return (
    <div
      className={`${identity.is_admin ? 'pointer-events-none opacity-0' : ''} relative max-w-2xl flex-1`}
      onFocus={() => {
        setOnFocus(true);
        setSubmited(false);
        resetLimit();
      }}>
      <span
        onClick={() => {}}
        className=' absolute left-2 top-[5px] h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:text-white hover:dark:bg-slate-800'>
        <AiOutlineSearch className='stroke-textC h-full w-full' stroke='2' />
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOnFocus(false);
          setSubmited(true);
          resetLimit();
          ref.current.blur();
          navigate(`${DRIVE_SEARCH}?q=${searchValue}`);
        }}>
        <input
          ref={ref}
          onBlur={() => setOnFocus(false)}
          onChange={(e) => setKeyWord(e.target.value)}
          type='text'
          placeholder='Search file'
          className=' w-full  rounded-full bg-search-bg  px-2 py-[0.7rem] indent-11 focus:rounded-b-none
          focus:rounded-t-2xl focus:bg-white  focus:shadow-md focus:outline-none
          dark:bg-search-bg-dark dark:text-icons-color-dark dark:placeholder-blue-50 dark:placeholder-opacity-60'
        />
      </form>
      {onFocus && <SearchResult data={data} />}
    </div>
  );
}

export default Search;
