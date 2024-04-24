import { copyFiles, getEntryMetadata, getListEntriesMyDrive, getSharedEntries, moveToTrash, renameFile } from '@/apis/drive/drive.api';
import { CopyFileREQ } from '@/apis/drive/request/copy.request';
import { MoveToTrashREQ } from '@/apis/drive/request/move-to-trash.request';
import { RenameREQ } from '@/apis/drive/request/rename.request';
import { useSession } from '@/store/auth/session';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { fileTypeIcons } from '@/utils/constants/file-icons.constant';
import { fileTypes } from '@/utils/constants/file-types.constant';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useListEntries = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;
  // console.log('[useListEntries] id', id);
  // console.log('[useListEntries] rootId', rootId);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['mydrive-entries', id],
    queryFn: async () => {
      return (await getListEntriesMyDrive({ id, limit: 100 }).then((res) => res?.data?.entries || [])).filter(
        (e) => !e.name.includes('.trash'),
      );
    },
    staleTime: 10 * 1000,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { dirId: id, data: data || [], refetch, isLoading };
};

export const useCopyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CopyFileREQ) => {
      return copyFiles(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success('Created ' + (data.data.length > 1 ? `${data.data.length} files` : `${data.data[0].name}`));
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    },
  });
};

export const useRenameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RenameREQ) => {
      return renameFile(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.data.name}`);
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    },
  });
};

export const useMoveToTrashMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: MoveToTrashREQ) => {
      return moveToTrash(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`${data.data.length} files moved to trash`);
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    },
  });
}

export const useEntryMetadata = (id: string) => {
  const { drawerOpen } = useDrawer();
  const identity = useSession((state) => state.identity);
  const { data, isLoading, error } = useQuery({
    queryKey: ['file-metadata', id],
    queryFn: () => getEntryMetadata({ id }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: (data) => {
      const path = data.path.split('/');
      console.log('[useEntryMetadata] path', path);
      const location = { name: path[path.length - 2] === identity.id ? 'My Drive' : path[path.length - 2], id };
      if (data.is_dir && data.path !== '/') {
        return {
          is_dir: true,
          icon: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
          name: data.name,
          preview: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
          type: 'Folder',
          location,
          owner: { username: data.owner.email, avatar_url: data.owner.avatar_url },
          modified: new Date(data.updated_at),
          opened: 'N/a',
          created: new Date(data.created_at),
          download_perm: 'N/a',
        };
      } else if (!data.is_dir) {
        const ext = data.name.split('.').pop() || 'any';
        return {
          is_dir: false,
          icon: fileTypeIcons[ext] || fileTypeIcons.any,
          name: data.name,
          preview: fileTypeIcons[ext] || fileTypeIcons.any,
          type: fileTypes[ext] || fileTypes.any,
          location,
          owner: { username: data.owner.email, avatar_url: data.owner.avatar_url },
          modified: new Date(data.updated_at),
          opened: 'N/a',
          created: new Date(data.created_at),
          download_perm: 'N/a',
          size: data.size,
        };
      }
    },
    enabled: !!drawerOpen && !!id,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data, isLoading };
};

export const useEntryAccess = (id: string) => {
  const { drawerOpen } = useDrawer();
  const { data, isLoading, error } = useQuery({
    queryKey: ['access', id],
    queryFn: () => getSharedEntries({ id }).then((res) => res?.data),
    select: (data) => {
      return {
        whoHasAccess: 'N/a',
      };
    },
    staleTime: 10 * 1000,
    enabled: !!drawerOpen && !!id,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data, isLoading };
};
