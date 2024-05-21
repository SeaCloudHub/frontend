import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { useSharedFileInfo } from '@/store/storage/file-share-info.store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareFile = () => {
  const { fileInfo, role } = useSharedFileInfo();
  console.log(role);
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
            navigate(-1);
          }}
        />
      )}
    </>
  );
};

export default ShareFile;
