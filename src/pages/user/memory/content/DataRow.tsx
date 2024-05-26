import React, { useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { LocalEntry } from '@/hooks/drive.hooks';
import { useSelected } from '@/store/my-drive/myDrive.store';

export const DataRow: React.FC<LocalEntry> = ({ id, isDir, title, icon, lastModified, owner, size, userRoles }) => {
  const { arrSelected, setArrSelected } = useSelected();

  const handleCtrlClick = () => {
    setArrSelected(
      arrSelected.some((e) => e.id === id)
        ? arrSelected.filter((item) => item.id !== id)
        : [...arrSelected, { id, isDir, userRoles }],
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    setArrSelected([{ id, isDir, userRoles }]);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    if (isDir) {
      setArrSelected && setArrSelected([]);
      // onDoubleClick && onDoubleClick();
    } else {
      // parent !== 'trash' && setFileViewer(true);
    }
  };

  // useEffect(() => {
  //   if (result) {
  //     setResult(false);
  //     setArrSelected([]);
  //   }
  // }, [result, setArrSelected]);

  return (
    <div className='grid cursor-pointer select-none grid-cols-7 items-center space-x-3 border-b border-b-[#dadce0] py-2 hover:bg-[#f0f1f1] max-[500px]:grid-cols-6'>
      <div className='col-span-6 flex items-center text-sm font-medium'>
        <div className='px-4'>
          <div className='h-6 w-6'> {icon} </div>
        </div>
        <Tooltip title={title}>
          <div className='line-clamp-1'> {title} </div>
        </Tooltip>
      </div>
      <div className='col-span-1 truncate max-[500px]:hidden'>
        {size ? (
          <Tooltip title={`${size} bytes `}>
            <span>{size}</span>
          </Tooltip>
        ) : (
          <span>---</span>
        )}
      </div>
    </div>
  );
};
