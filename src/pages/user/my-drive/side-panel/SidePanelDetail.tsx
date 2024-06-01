import { downloadFileApi } from '@/apis/user/storage/storage.api';
import { useEntryAccess } from '@/hooks/drive.hooks';
import { useSession } from '@/store/auth/session';
import { useStorageStore } from '@/store/storage/storage.store';
import { numToSize } from '@/utils/function/numbertToSize';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { LinearProgress } from '@mui/material';
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { DriveLocationButton } from './DriveLocationButton';
import { DefaultTabPanel } from './SidePanel';

type SidePanDetailProps = {
  id: string;
  title: string;
  isLoading: boolean;
  details: any;
};

const SidePanelDetail: React.FC<SidePanDetailProps> = ({ id, title, details, isLoading }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const identity = useSession((state) => state.identity);
  const { data: access, isLoading: isLoadingAccess, error } = useEntryAccess(id);
  // const {data, isLoading} = useEntryDetails(id);
  const { rootId } = useStorageStore();

  useEffect(() => {
    const getUrl = async () => {
      try {
        const res = await downloadFileApi(id);
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        if (isAxiosError<ApiGenericError>(error)) {
          toast.error(error.response?.data.message, toastError());
        }
      }
    };

    if (
      details &&
      !isLoading &&
      (details.mime_type === 'image/png' || details.mime_type === 'image/jpg' || details.mime_type === 'image/jpeg')
    ) {
      getUrl();
    } else {
      setImageUrl(null);
    }
  }, [details, isLoading, id]);

  return error ? (
    <DefaultTabPanel />
  ) :
  isLoading ? (
    <LinearProgress className=' translate-y-1' />
  ) : details ? (
    <div className='flex flex-col space-y-6 '>
      <div className='flex w-full items-center justify-center'>
        {imageUrl ? <img src={imageUrl} alt={title} className='h-full w-full object-cover' /> : details.preview}
      </div>

      <div className='flex flex-col space-y-2 pl-4'>
        <div className='font-medium'>Who has access</div>
        <div className='flex flex-col'>
          {isLoadingAccess ? 'Loading...' : access ? access.whoHasAccess : 'N/a'}
          {/* <Avatar alt={details.owner.username} src={details.owner.url} sx={{ width: 32, height: 32 }} />
          <div className='flex h-8 items-center text-xs'>Private to you</div> */}
        </div>
        <div className='flex h-10 w-36 cursor-pointer items-center justify-center rounded-full border border-outline hover:bg-[#f5f8fd]'>
          <div className='text-sm font-medium text-[#1a61d3]'>Manage Access</div>
        </div>
      </div>

      <div className='border-t border-[#cbcbcb]'></div>
      <div className='flex flex-col gap-[0.5rem] pl-4'>
        <div className='font-medium'>{details.is_dir ? 'Folder details' : 'File details'}</div>
        <div className='flex flex-col gap-[1.125rem]'>
          <div>
            <div className='text-xs font-medium'>Type</div>
            <div className='text-sm'>{details.type}</div>
          </div>
          {!details.is_dir && (
            <div>
              <div className='text-xs font-medium'>Size</div>
              <div className='text-sm'>{numToSize(details.size)}</div>
            </div>
          )}
          {!details.is_dir && (
            <div>
              <div className='text-xs font-medium'>Storage used </div>
              <div className='text-sm'>{numToSize(details.size)}</div>
            </div>
          )}
          <div>
            <div className='mb-1 text-xs font-medium'>Location</div>
            <DriveLocationButton label={details.location.id === rootId ? 'My Drive' : details.location.name} icon='drive' />
          </div>
          <div>
            <div className='text-xs font-medium'>Owner</div>
            <div className='text-sm'>{details.owner.username === identity.id ? ' me ' : details.owner.username}</div>
          </div>
          <div>
            <div className='text-xs font-medium'>Modified </div>
            <div className='text-sm'>
              {details.modified.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Ho_Chi_Minh',
              }) +
                ' by ' +
                'N/a'}
            </div>
          </div>
          <div>
            <div className='text-xs font-medium'>Opened </div>
            <div className='text-sm'>{details.opened}</div>
          </div>
          <div>
            <div className='text-xs font-medium'>Created </div>
            <div className='text-sm'>
              {details.created.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Ho_Chi_Minh',
              }) +
                ' by ' +
                'N/a'}
            </div>
          </div>
          <div>
            <div className='text-xs font-medium'>Download permissions</div>
            <div className='text-sm'>{details.download_perm}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <DefaultTabPanel />
  );
};

export default SidePanelDetail;
