import {
  copyFiles,
  deleteFiles,
  getAccessEntries,
  getEntryMetadata,
  getListEntriesMyDrive,
  getListEntriesTrash,
  getSharedEntries,
  moveToTrash,
  renameFile,
} from '@/apis/drive/drive.api';
import { CopyFileREQ, RenameREQ, DeleteFilesREQ } from '@/apis/drive/drive.request';
import { EntryMetadataRES, EntryRESP } from '@/apis/drive/drive.response';
import { MoveToTrashREQ } from '@/apis/drive/request/move-to-trash.request';
import { Path, useDrawer } from '@/store/my-drive/myDrive.store';
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

  const { data: parents, error: parentsError } = useQuery({
    queryKey: ['entry-metadata', id],
    queryFn: () => getEntryMetadata({ id }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: (data): Path => {
      if (data.parents) {
        data.parents.sort((a, b) => a.path.localeCompare(b.path));

        const path = data.parents.map((parent) =>
          parent.id === rootId ? { id: rootId, name: 'My Drive' } : { id: parent.id, name: parent.name },
        );
        // console.log('[useListEntries] path', path);
        path.push({ id: data.file.id, name: data.file.name });
        return path;
      }
      return [{ id: rootId, name: 'My Drive' }];
    },
  });

  if (isAxiosError<ApiGenericError>(parentsError)) {
    toast.error(parentsError.response?.data.message, toastError());
  }

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['mydrive-entries', id],
    queryFn: async () => {
      return (await getListEntriesMyDrive({ id, limit: 100 }).then((res) => res?.data?.entries || [])).filter(
        (e) => !e.name.includes('.trash'),
      );
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { parents: parents || [{ id, name: 'My Drive' }], data: data || [], refetch, isLoading };
};

export const useSharedEntry = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;

  const { data: parents, error: parentsError } = useQuery({
    queryKey: ['entry-metadata', id],
    queryFn: () => getEntryMetadata({ id }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: (data): Path => {
      if (data.parents) {
        data.parents.sort((a, b) => a.path.localeCompare(b.path));

        const path = data.parents.map((parent) =>
          parent.id === rootId ? { id: rootId, name: 'Shared' } : { id: parent.id, name: parent.name },
        );
        console.log('[useSharedEntry] path', path);
        path.push({ id: data.file.id, name: data.file.name });
        return path;
      }
      return [{ id: rootId, name: 'Shared' }];
    },
  });

  if (isAxiosError<ApiGenericError>(parentsError)) {
    toast.error(parentsError.response?.data.message, toastError());
  }

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['shared-entries', id],
    queryFn: async () => {
      return await getSharedEntries().then((res) => res?.data || []);
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { parents: parents || [{ id, name: 'Shared' }], data: data || [], refetch, isLoading };
};

export const useTrash = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['Trash-entries', id],
    queryFn: async () => {
      return await getListEntriesTrash({ id, limit: 100 }).then((res) => res?.data?.entries || []);
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data: data || [], refetch, isLoading };
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
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DeleteFilesREQ) => {
      return deleteFiles(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`${data.data.length} files deleted`);
      queryClient.invalidateQueries({ queryKey: ['Trash-entries'] });
    },
  });
};

export const useEntryMetadata = (id: string) => {
  const { drawerOpen } = useDrawer();
  const { data, isLoading, error } = useQuery({
    queryKey: ['entry-metadata', id],
    queryFn: () => getEntryMetadata({ id }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: transformMetadata,
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
    queryFn: () => getAccessEntries({ id }).then((res) => res?.data),
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

const transformMetadata = (data: EntryMetadataRES) => {
  data.parents?.sort((a, b) => a.path.localeCompare(b.path));
  if (data.file.is_dir && data.parents) {
    return {
      is_dir: true,
      icon: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
      name: data.file.name,
      preview: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
      type: 'Folder',
      location: { id: data.parents[data.parents.length - 1].id, name: data.parents[data.parents.length - 1].name },
      owner: { username: data.file.owner.email, avatar_url: data.file.owner.avatar_url },
      modified: new Date(data.file.updated_at),
      opened: 'N/a',
      created: new Date(data.file.created_at),
      download_perm: 'N/a',
    };
  } else if (!data.file.is_dir) {
    const ext = data.file.name.split('.').pop() || 'any';
    return {
      is_dir: false,
      icon: fileTypeIcons[ext] || fileTypeIcons.any,
      name: data.file.name,
      preview: fileTypeIcons[ext] || fileTypeIcons.any,
      type: fileTypes[ext] || fileTypes.any,
      location: { id: data.parents[data.parents.length - 1].id, name: data.parents[data.parents.length - 1].name },
      owner: { username: data.file.owner.email, avatar_url: data.file.owner.avatar_url },
      modified: new Date(data.file.updated_at),
      opened: 'N/a',
      created: new Date(data.file.created_at),
      download_perm: 'N/a',
      size: data.file.size,
    };
  }
};

export type LocalEntry = {
  isDir: boolean;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
  extra: string;
  owner: string;
  lastModified: string;
  size: string;
  fileType?: string;
  onDoubleClick?: () => void;
  onChanged?: () => void;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash';
};

export const transformEntries = (entries: EntryRESP[]): LocalEntry[] => {
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='object-cover-full h-full w-full dark:text-yellow-600' />,
        preview: <Icon icon='ic:baseline-folder' className='h-full w-full dark:text-yellow-600' />,
        id: entry.id,
        extra: 'extra',
        owner: 'owner',
        fileType: entry.mine_type,
        ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
        lastModified: entry.updated_at,
        size: entry.size.toString(),
      } as LocalEntry;
    }
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileTypeIcons[ext] || fileTypeIcons.any;
    /* Suport mp4, mp3, pdf, jpg, jpeg, png, jfif, gif, webp, ico, svg,
    docx, txt, zip, any */
    const preview = ['jpg', 'ico', 'webp', 'png', 'jpeg', 'gif', 'jfif'].includes(ext) ? (
      <img
        draggable={false}
        className='h-full w-full rounded-md object-cover'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s'
      />
    ) : (
      <div className='h-16 w-16'>{icon}</div>
    );
    return {
      isDir: false,
      title: entry.name,
      icon: icon,
      preview: preview,
      id: entry.id,
      extra: 'extra',
      owner: 'owner',
      ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      lastModified: entry.updated_at,
      size: entry.size.toString(),
    };
  });
};
