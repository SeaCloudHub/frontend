import IconifyIcon from '@/components/core/Icon/IConCore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
type UserManagementFilterProps = {
  handleSearch(keyword: string);
};
const UserManagementFilter = ({ handleSearch }: UserManagementFilterProps) => {
  const [keyword, setKeyword] = useState('');
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
    }
  };

  return (
    <div className='relative flex max-w-2xl  '>
      <span
        onClick={() => {
          handleSearch(keyword);
        }}
        className=' absolute left-2 top-[5px] z-20 h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:text-white hover:dark:bg-slate-800'>
        <AiOutlineSearch className='stroke-textC h-full w-full' stroke='2' />
      </span>
      {keyword.length > 0 && (
        <div
          onClick={() => {
            setKeyword('');
          }}
          className='absolute right-2  top-[5px] flex h-9 w-9 items-center justify-center   rounded-full hover:bg-gray-100 dark:text-white hover:dark:bg-slate-800'>
          <IconifyIcon icon={'carbon:close-outline'} />
        </div>
      )}
      <input
        value={keyword}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        type='text'
        placeholder='Search user by name or email'
        className=' w-full  rounded-full bg-search-bg  px-2 py-[0.7rem] indent-11
          focus:bg-white  focus:shadow-md focus:outline-none
          dark:bg-search-bg-dark dark:text-icons-color-dark dark:placeholder-blue-50 dark:placeholder-opacity-60'
      />
    </div>
  );
};

export default UserManagementFilter;
