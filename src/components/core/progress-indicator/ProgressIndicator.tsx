'use client';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmarkCircle } from 'react-icons/io';
import fileTypeIcons from '../../../utils/constants/file-icons.constant';
import CircleProgress from './CircleProgress';

function ProgressIndicator() {
  const [minimize, setMinimize] = useState(true);
  const { filesUploaded, reset } = useProgressIndicator();
  // show all file name and progress
  const temp = filesUploaded.map((file, index) => {
    const fileExtension = file.fileName.split('.').pop();
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
          <span className='w-60 truncate'>{file.fileName}</span>
        </div>
        {!file.success ? (
          <AiOutlineExclamationCircle className='h-9 w-9 p-1.5 pr-2 text-red-600' />
        ) : file.progress < 100 ? (
          <div className='pr-2'>
            <CircleProgress value={file.progress} />
          </div>
        ) : (
          <IoMdCheckmarkCircle className='h-9 w-9 p-1.5 pr-2 text-green-600' />
        )}
      </div>
    );
  });

  return (
    filesUploaded.length > 0 && (
      <div className='fixed bottom-0 right-3 z-50 h-fit bg-[#063768]'>
        <div
          className={`shadow-textC tablet:right-10  right-8 z-20 w-[23rem] overflow-hidden rounded-t-2xl shadow-sm ${
            minimize ? '-bottom-4' : '-top-10'
          }`}>
          <div className='bg-bgc flex items-center justify-between py-2 pl-4 pr-2'>
            <h3 className='text-textC font-medium text-white'>
              {filesUploaded.filter((file) => file.success && file.progress == 100).length}/{filesUploaded.length} uploaded
              successfully
            </h3>
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
