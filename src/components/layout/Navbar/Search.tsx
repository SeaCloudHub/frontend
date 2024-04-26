import ModalSearchAdvanced from '@/components/core/modal/ModalSearchAdvanced';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/providers/theme-provider';
import { useMemo, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchResult from './SearchResult';

function Search() {
  const [keyWord, setKeyWord] = useState<string>('');
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const list = [
    {
      id: 'da',
      fileName: 'dadas',
      fileExtension: 'pdf',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
    {
      id: 'da',
      fileName: 'Trieu dep tria',
      fileExtension: 'docx',
      fileLink: 'dasdsa',
      folderId: 'dad',
      folderName: 'das',
      isFolder: false,
      isStarred: false,
      isTrashed: false,
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const searchValue = useDebounce({ delay: 260, value: keyWord });
  const results = useMemo(() => {
    return list.filter((item) => {
      return (
        (item.fileName?.toLowerCase().includes(keyWord.toLowerCase()) && keyWord && !item?.isTrashed) ||
        (item.folderName?.toLowerCase().includes(keyWord.toLowerCase()) && keyWord && !item?.isTrashed)
      );
    });
  }, [searchValue]);
  const { theme } = useTheme();
  const fill = theme === 'dark' ? 'white' : '';
  return (
    <div className='relative max-w-2xl flex-1 ' onFocus={() => setOnFocus(true)}>
      <span
        onClick={() => {}}
        className=' absolute left-2 top-[5px] h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:text-white hover:dark:bg-black '>
        <AiOutlineSearch className='stroke-textC h-full w-full' stroke='2' />
      </span>
      <span
        onClick={() => {
          setModalOpen(true);
        }}
        className='absolute  right-2  top-[5px] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full p-2 dark:hover:bg-black  '>
        <svg width='24' height='24' viewBox='0 0 24 24' focusable='false'>
          <path
            fill={fill}
            d='M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z'></path>
        </svg>
      </span>
      <input
        onBlur={() => setOnFocus(false)}
        onChange={(e) => setKeyWord(e.target.value)}
        type='text'
        placeholder='Search in Drive'
        className=' dark:bg-search-bg-dark  bg-search-bg dark:text-icons-color-dark  w-full rounded-full px-2 py-[0.7rem]
        indent-11 focus:rounded-b-none focus:rounded-t-2xl focus:bg-white
        focus:shadow-md focus:outline-none dark:placeholder-blue-50 dark:placeholder-opacity-60'
      />
      {onFocus && <SearchResult data={results} />}
      <ModalSearchAdvanced
        isOpen={modalOpen}
        handleConfirm={(data) => {
          setModalOpen(false);
          if (data) {
            //Return filter
            console.log();
          }
        }}
      />
    </div>
  );
}

export default Search;
