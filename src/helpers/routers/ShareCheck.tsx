import { getEntryMetadata } from '@/apis/drive/drive.api';
import { accessFileAPi } from '@/apis/user/storage/storage.api';
import { transformEntry } from '@/hooks/drive.hooks';
import ShareError from '@/pages/user/share/ShareError';
import { useSession } from '@/store/auth/session';
import { useSharedFileInfo } from '@/store/storage/file-share-info.store';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { FileShareRole } from '@/utils/types/file-share-role.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { locale } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ShareCheck = () => {
  const location = useLocation();
  const userId = useSession((state) => state.identity.id);
  const fileId = useMemo(() => {
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    return location.pathname.substring(lastSlashIndex + 1);
  }, [location]);
  const [checking, setChecking] = useState(true);
  const { data, error, isFetching } = useQuery({
    queryKey: ['get-file-metadata', fileId],
    queryFn: () => accessFileAPi({ id: fileId }),
    staleTime: 0,
  });
  const setFileInfo = useSharedFileInfo((state) => state.setFileInfo);
  const fileMetadataMutation = useMutation({
    mutationFn: () => {
      return getEntryMetadata({
        id: fileId,
      });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        if (error.response.status == 400) {
          setErrorMessage('File or Folder is not existed. Please check it again ');
        } else {
          setErrorMessage(error.response.data.message);
        }
        setChecking(false);
      } else {
        setErrorMessage(error.message);
        setChecking(false);
      }
    },
    onSuccess: (data) => {
      const localEntry = transformEntry(data.data.file);
      const role = data.data.users.find((user) => user.user_id === userId)?.role as FileShareRole;
      if(localEntry.isDir&&location.pathname.includes('file')){
            setErrorMessage('File or Folder is not existed. Please check it again ');
      }
      else{
        setFileInfo(localEntry, role);
        setChecking(false);
      }
    },
  });
  const [ErrorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      if (isAxiosError<ApiGenericError>(error)) {
        if (error.response?.status == 400) {
          setErrorMessage('File or Folder is not existed. Please check it again ');
        } else if (error.response.status == 403) {
          setErrorMessage('');
        } else {
          setErrorMessage(error.response.data.message);
        }
      } else {
        setErrorMessage(error.message);
      }
      setChecking(false);
    } else {
      fileMetadataMutation.mutateAsync();
    }
  }, [error]);
  return (
    <>
      {!checking && (ErrorMessage ? <ShareError message={ErrorMessage} /> : <Outlet />)}
      {checking && <img src={(import.meta.env.BASE_URL + 'loader.svg') as string} className='mx-auto  h-[50px] w-[50px]' />}
    </>
  );
};

export default ShareCheck;
