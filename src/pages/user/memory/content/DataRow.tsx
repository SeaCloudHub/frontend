import React, { useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { LocalEntry } from '@/hooks/drive.hooks';
import { useSelected } from '@/store/my-drive/myDrive.store';
import { Star } from '@mui/icons-material';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { useNavigate } from 'react-router-dom';
import { numToSize } from '@/utils/function/numbertToSize';

type DataRowProps = LocalEntry & {
  isSelected?: boolean;
};

export const DataRow: React.FC<DataRowProps> = ({
  id,
  isDir,
  title,
  icon,
  lastModified,
  owner,
  size,
  userRoles,
  is_starred,
  fileType,
  isSelected,
}) => {
  const { arrSelected, setArrSelected } = useSelected();
  const [fileViewer, setFileViewer] = React.useState(false);
  const navigate = useNavigate();

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
      navigate(`/drive/my-drive/dir/${id}`);
    } else {
      setFileViewer(true);
      // parent !== 'trash' && setFileViewer(true);
    }
  };

  return (
    <>
      {fileViewer && (
        <FileViewerContainer
          open={fileViewer}
          closeOutside={() => {
            setFileViewer(false);
          }}
          fileInfo={{
            isDir: false,
            title: title,
            icon: icon,
            preview: '',
            id: id,
            owner: null,
            lastModified: new Date(),
            size: size,
            fileType: fileType,
            userRoles: userRoles,
          }}
        />
      )}
      <div
        className={`grid cursor-pointer select-none grid-cols-7 items-center space-x-3 border-b border-b-[#dadce0]  py-2 hover:bg-[#dfe3e7] ${isSelected ? 'bg-[#c2e7ff] dark:bg-blue-900 dark:hover:brightness-90' : ' dark:text-white dark:hover:bg-slate-700'}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}>
        <div className='col-span-6 flex items-center text-sm font-medium max-[500px]:grid-cols-7'>
          <div className='px-4'>
            <div className='h-6 w-6'> {icon} </div>
          </div>
          <Tooltip title={title}>
            <div className='line-clamp-1'> {title} </div>
          </Tooltip>
          {is_starred && <Star className='dark:text-yellow-400' />}
        </div>
        <div className='col-span-1 truncate max-[500px]:hidden'>
          {size ? (
            <Tooltip title={numToSize(size)}>
              <span>{numToSize(size)}</span>
            </Tooltip>
          ) : (
            <span>---</span>
          )}
        </div>
      </div>
    </>
  );
};
