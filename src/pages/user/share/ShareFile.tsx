import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { useSharedFileInfo } from '@/store/storage/file-share-info.store';
import { DRIVE_MY_DRIVE, DRIVE_SHARED } from '@/utils/constants/router.constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareFile = () => {
  const { fileInfo, role } = useSharedFileInfo();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {open && (
        <FileViewerContainer
          canShare={role == 'editor' || role == 'owner'}
          open={true}
          fileInfo={fileInfo}
          closeOutside={() => {
            setOpen(false);
            navigate(role == 'owner' ? DRIVE_MY_DRIVE : DRIVE_SHARED);
          }}
        />
      )}
    </>
  );
};

export default ShareFile;
