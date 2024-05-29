import { downloadFile } from '@/apis/drive/drive.api';
import { FileViewerProps } from '@/utils/types/file-viewer-props.type';
import IconifyIcon from '../../Icon/IConCore';
import { useDownloadMutation } from '@/hooks/drive.hooks';

const UnSupportFile: React.FC<FileViewerProps> = ({ fileId, fileName }) => {
  const downloadMutation = useDownloadMutation();
  const onDownloadFile = () => {
    downloadMutation.mutate({ id: fileId, name: fileName });
  };
  return (
    <div className='flex flex-col items-center justify-center space-y-2 dark:text-white'>
      <p>No preview available</p>
      <div
        onClick={() => {
          onDownloadFile();
        }}
        className={` cursor-pointer items-center space-x-2 rounded-md bg-[#1a73e8] p-2 text-white hover:bg-blue-700 sm:flex`}>
        <IconifyIcon icon='material-symbols-light:download' fontSize={16} />
        <p className='text-sm'>Download</p>
      </div>
    </div>
  );
};

export default UnSupportFile;
