'use client';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmarkCircle } from 'react-icons/io';
import fileTypeIcons from '../../../utils/constants/file-icons.constant';

function ProgressIndicator() {
  const [minimize, setMinimize] = useState(true);
  const { fileNames, progress, reset } = useProgressIndicator();
  // show all file name and progress
  const temp = fileNames.map((name, index) => {
    const fileExtension = name.split('.').pop();
    return (
      <div
        key={index}
        className='hover:bg-darkC flex cursor-pointer items-center justify-between bg-white  py-2.5  pl-4 pr-2 text-black dark:bg-black dark:text-white'>
        <div className='flex items-center space-x-3'>
          {fileExtension && fileTypeIcons[fileExtension] ? (
            <div className='h-6 w-6'>{fileTypeIcons[fileExtension]}</div>
          ) : (
            <div className='h-6 w-6'>{fileTypeIcons['any']}</div>
          )}
          <span className='w-60 truncate'>{name}</span>
        </div>
        {progress[index]! < 100 ? (
          <span className='pr-2'>{progress[index]}%</span>
        ) : (
          <IoMdCheckmarkCircle className='h-9 w-9 p-1.5 pr-2 text-green-600' />
        )}
      </div>
    );
  });

  return (
    fileNames.length > 0 && (
      <div className='fixed bottom-0 right-3 z-50 h-fit bg-[#063768]'>
        <div
          className={`shadow-textC tablet:right-10  right-8 z-20 w-[23rem] overflow-hidden rounded-t-2xl shadow-sm ${
            minimize ? '-bottom-4' : '-top-10'
          }`}>
          <div className='bg-bgc flex items-center justify-between py-2 pl-4 pr-2'>
            {progress[0]! < 100 ? (
              <h3 className='text-textC flex items-center space-x-5 font-medium'>
                <span className='animate-pulse'>Uploading file</span>
                <AiOutlineLoading3Quarters className='animate-spin text-green-600' />
              </h3>
            ) : (
              <h3 className='text-textC font-medium text-white'>
                {fileNames.length} upload{fileNames.length > 1 && 's'} complete
              </h3>
            )}
            <div className='flex items-center text-white'>
              {minimize ? (
                <IoIosArrowDown
                  onClick={() => setMinimize(!minimize)}
                  className='h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-400'
                  stroke='2'
                />
              ) : (
                <IoIosArrowUp
                  onClick={() => setMinimize(!minimize)}
                  className='h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-gray-400'
                  stroke='2'
                />
              )}
              <AiOutlineClose onClick={() => reset()} className='h-9 w-9   cursor-pointer rounded-full p-2 hover:bg-gray-400' />
            </div>
            {/* uploaded files progress */}
          </div>
          {minimize && <div className='flex max-h-60 flex-col overflow-y-scroll'>{temp}</div>}
        </div>
      </div>
    )
  );
}

export default ProgressIndicator;
