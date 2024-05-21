import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import {
  copyFiles,
  deleteEntries,
  getAccessEntries,
  getEntryMetadata,
  getListEntries,
  getListEntriesPageMyDrive,
  getListEntriesPageStarred,
  getListEntriesSuggested,
  getListEntriesTrash,
  getListFileSizes,
  getSharedEntries,
  getStorage,
  moveEntries,
  moveToTrash,
  renameEntry,
  restoreEntries,
  searchEntriesApi,
  starEntry,
  unstarEntry,
} from '@/apis/drive/drive.api';
import {
  CopyFileREQ,
  RenameREQ,
  DeleteEntriesREQ,
  RestoreEntriesREQ,
  ListEntriesPageREQ,
  TypeEntry,
  StarEntriesREQ,
} from '@/apis/drive/drive.request';
import {
  EntryMetadataRES,
  EntryRESP,
  ListEntriesRESP,
  LogEntry,
  ParentRES,
  SuggestedEntriesRESP,
} from '@/apis/drive/drive.response';
import { MoveToTrashREQ } from '@/apis/drive/request/move-to-trash.request';
import { downloadFileApi, uploadFilesApi } from '@/apis/user/storage/storage.api';
import { LocalEntryToTimeEntry } from '@/pages/user/trash/trash-page-view/DriveHistoryGridView';
import { Path, useDrawer, useEntries, useIsFileMode, useLimit, useFilter } from '@/store/my-drive/myDrive.store';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { fileTypeIcons } from '@/utils/constants/file-icons.constant';
import { fileTypes } from '@/utils/constants/file-types.constant';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useListEntries = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const { typeFilter, modifiedFilter } = useFilter();
  const { limit } = useLimit();

  const id = dirId || rootId;
  const { setListEntries, listEntries } = useEntries();

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
    queryKey: ['mydrive-entries', id, limit, typeFilter, modifiedFilter],
    queryFn: async () => {
      const res = await getListEntries({
        ...{ id, limit, type: typeFilter },
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data);
      return res?.entries || [];
    },
    staleTime: 1000,
    select: transformEntries,
  });

  useEffect(() => {
    if (data) setListEntries(data);
  }, [data, setListEntries]);

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { parents: parents || [{ id, name: 'My Drive' }], data: listEntries, refetch, isLoading };
};

export const useListFolders = (volumn?: 'Priority' | 'My Drive' | 'Starred' | 'Shared', dirId?: string) => {
  const { rootId } = useStorageStore();
  if (!dirId) dirId = rootId;

  const { data: parents, error: parentsError } = useQuery({
    queryKey: ['entry-metadata', dirId],
    queryFn: () => getEntryMetadata({ id: dirId }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: (data): Path => {
      if (data.parents) {
        data.parents.sort((a, b) => a.path.localeCompare(b.path));
        const path = data.parents.map((parent) =>
          parent.id === rootId ? { id: rootId, name: volumn || 'My Drive' } : { id: parent.id, name: parent.name },
        );
        path.push({ id: data.file.id, name: data.file.name });
        return path;
      }
      return [{ id: rootId, name: volumn || 'My Drive' }];
    },
  });

  if (isAxiosError<ApiGenericError>(parentsError)) {
    toast.error(parentsError.response?.data.message, toastError());
  }
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['list-folders', dirId, volumn],
    queryFn: async () => {
      // console.log('[useListFolders] volumn', volumn);
      if (dirId !== rootId) volumn = 'My Drive';
      switch (volumn) {
        case 'Starred':
          return (await getListEntriesPageStarred().then((res) => res?.data || []))
            .filter((e) => e.is_dir)
            .filter((e) => !e.name.includes('.trash'));
        case 'Shared':
          return (await getSharedEntries().then((res) => res?.data || []))
            .filter((e) => e.is_dir)
            .filter((e) => !e.name.includes('.trash'));
        default:
          return (await getListEntriesPageMyDrive({ id: dirId, limit: 100 }).then((res) => res?.data?.entries || []))
            .filter((e) => e.is_dir)
            .filter((e) => !e.name.includes('.trash'));
      }
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { parents: parents || [{ id: dirId, name: 'My Drive' }], data: data || [], refetch, isLoading };
};

export const useSuggestedEntries = () => {
  const { limit } = useLimit();
  const { isFileMode, setIsFileMode } = useIsFileMode();
  const { setListSuggestedEntries, listSuggestedEntries } = useEntries();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['suggested-entries', limit, isFileMode ? 'File' : 'Folder'],
    queryFn: async () => {
      const res = await getListEntriesSuggested({ limit, dir: !isFileMode }).then((res) => res?.data);
      console.log('[useSuggestedEntries] res', res);
      return res || [];
    },
    staleTime: 10 * 1000,
    select: transformSuggestedEntries,
  });

  useEffect(() => {
    if (data) setListSuggestedEntries(data);
  }, [data, setListSuggestedEntries]);

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data: listSuggestedEntries || [], refetch, isLoading };
};

export const useSearchEntries = (query: string, set?: boolean) => {
  const { limit } = useLimit();
  const { setListEntries, listEntries } = useEntries();
  const { typeFilter, modifiedFilter } = useFilter();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['search-entries', query, limit, set, typeFilter, modifiedFilter],
    queryFn: async () => {
      if (!query) return [];
      const res = await searchEntriesApi({
        ...{ query, limit, type: typeFilter },
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data?.entries);
      return res || [];
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  useEffect(() => {
    if (data && set) setListEntries(data);
  }, [data, set, setListEntries]);

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data: !set ? data||[] : listEntries, refetch, isLoading };
}

export const useSearchEntriesPage = () => {
  const query = useQueries().get('q') || '';

  const { data, refetch, isLoading } = useSearchEntries(query, true);

  return { data: data, refetch, isLoading };
}

export const usePriorityEntries = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['priority-entries', id],
    queryFn: async () => {
      return (await getListEntriesPageMyDrive({ id, limit: 100 }).then((res) => res?.data?.entries || [])).filter(
        (e) => !e.name.includes('.trash'),
      );
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data: data || [], refetch, isLoading };
};

export const useQueries = () => {
  return new URLSearchParams(useLocation().search);
};

export const useSharedEntry = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;
  const {modifiedFilter, typeFilter} = useFilter();

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
        // console.log('[useSharedEntry] path', path);
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
    queryKey: ['shared-entries', id, modifiedFilter, typeFilter],
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
  const {limit} = useLimit();
  const {trashEntries, setTrashEntries} = useEntries();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['Trash-entries', id, limit],
    queryFn: async () => {
      const res = await getListEntriesTrash({ limit }).then((res) => res?.data?.entries || []);
      return transformEntries(res);
    },
    staleTime: 10 * 1000,
    select: LocalEntryToTimeEntry,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  useEffect(() => {
    if(data) setTrashEntries(data);
  }, [data, setTrashEntries]);

  return { data: trashEntries, refetch, isLoading };
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
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
    },
  });
};

export const useRenameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RenameREQ) => {
      return renameEntry(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.data.name}`);
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
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
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
    },
  });
};


export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DeleteEntriesREQ) => {
      return deleteEntries(body);
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

export const useStarred = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['starred-entries', id],
    queryFn: async () => {
      return await getListEntriesPageStarred().then((res) => res?.data || []);
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data: data || [], refetch, isLoading };
};

export const useStarEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: StarEntriesREQ) => {
      return starEntry(param);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`Files starred`);
      queryClient.invalidateQueries({ queryKey: ['starred-entries'] });
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
    },
  });
};

export const useUnstarEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: StarEntriesREQ) => {
      return unstarEntry(param);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`Files unstarred`);
      queryClient.invalidateQueries({ queryKey: ['starred-entries'] });
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
    },
  });
};

export const useMoveEntriesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Required<{ id: string; to: string }> & RestoreEntriesREQ) => {
      return moveEntries(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success(`${data.data.length} entries moved`);
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
      queryClient.invalidateQueries({ queryKey: ['starred-entries'] });
      queryClient.invalidateQueries({ queryKey: ['Shared-entries'] });
    },
  });
};

export const useRestoreEntriesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RestoreEntriesREQ) => {
      return restoreEntries(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success('files restored');
      queryClient.invalidateQueries({ queryKey: ['Trash-entries'] });
    },
  });
};

export const useEntryMetadata = (id: string) => {
  const { drawerOpen } = useDrawer();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['entry-metadata', id],
    queryFn: () => getEntryMetadata({ id }).then((res) => res?.data),
    staleTime: 10 * 1000,
    select: transformMetadata,
    enabled: !!drawerOpen && !!id,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data, isLoading, isFetching };
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

export const useUploadMutation = () => {
  const setFileNames = useProgressIndicator((state) => state.setFileNames);
  return useMutation({
    mutationFn: (body: { files: File[]; id: string }) => {
      return uploadFilesApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      setFileNames(data.data.map((item) => item.name));
    },
  });
};

export const useMemoryStatistics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-storage'],
    queryFn: () => getStorage().then((res) => res?.data),
    select: (data) => {
      const types = [
        { title: 'Text', value: data.text, color: '#2E02F2' },
        { title: 'Document', value: data.document, color: '#33CC33' },
        { title: 'PDF', value: data.pdf, color: '#F26B02' },
        { title: 'Json', value: data.json, color: '#D30758' },
        { title: 'Image', value: data.image, color: '#49369D' },
        { title: 'Video', value: data.video, color: '#3B733B' },
        { title: 'Audio', value: data.audio, color: '#73533B' },
        { title: 'Archive', value: data.archive, color: '#B3735E' },
        { title: 'Other', value: data.other, color: '#928B88' },
      ];
      types.sort((a, b) => b.value - a.value);
      return { types, capacity: data.capacity };
    },
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  return { data, isLoading };
}

export const useMemory = (asc: boolean) => {
  const {limit} = useLimit();
  const {typeFilter, modifiedFilter} = useFilter();
  const {listEntries, setListEntries} = useEntries();

  const { data, isLoading, error } = useQuery({
    queryKey: ['memory-entries', limit, typeFilter, modifiedFilter, asc],
    queryFn: () => getListFileSizes({
      limit,
      asc,
      type: typeFilter,
      ...(modifiedFilter ? {after: modifiedFilter} : {}),
    }).then((res) => res?.data?.entries || []),
    select: transformEntries,
  });

  if (isAxiosError<ApiGenericError>(error)) {
    toast.error(error.response?.data.message, toastError());
  }

  useEffect(() => {
    if(data) setListEntries(data || []);
  }, [data, setListEntries]);

  return { data: listEntries, isLoading };
}

const transformMetadata = (data: EntryMetadataRES) => {
  data.parents?.sort((a, b) => a.path.localeCompare(b.path));
  if (data.file.is_dir && data.parents) {
    return {
      is_dir: true,
      icon: <Icon icon='ic:baseline-folder' className='h-full w-full text-yellow-600' />,
      name: data.file.name,
      preview: <Icon icon='ic:baseline-folder' className='h-full w-full text-yellow-600' />,
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
      mime_type: data.file.mime_type,
    };
  }
};

export type LocalEntry = {
  isDir: boolean;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
  owner: IdentityRESP;
  lastModified: Date;
  size: number;
  fileType?: string;
};

export type SuggestedEntry = LocalEntry & { parent: ParentRES } & { log?: LogEntry };

export const transformEntries = (entries: EntryRESP[]): LocalEntry[] => {
  // console.log('[transformEntries] entries', entries);
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='h-full w-full object-cover text-yellow-600' />,
        preview: <Icon icon='ic:baseline-folder' className='h-32 w-32 text-yellow-600' />,
        id: entry.id,
        owner: entry.owner,
        fileType: entry.type,
        lastModified: new Date(entry.updated_at),
        size: entry.size,
      } as LocalEntry;
    }
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileTypeIcons[ext] || fileTypeIcons.any;
    return {
      isDir: false,
      title: entry.name,
      icon: icon,
      preview: entry.thumbnail ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_API}${entry.thumbnail}`}
          alt={entry.name}
          className='h-full w-full object-cover'
          draggable={false}
        />
      ) : (
        <div className='h-16 w-16'>{icon}</div>
      ),
      id: entry.id,
      owner: entry.owner,
      lastModified: new Date(entry.updated_at),
      fileType: entry.type,
      size: entry.size,
    } as LocalEntry;
  });
};

const transformSuggestedEntries = (entries: SuggestedEntriesRESP[]): SuggestedEntry[] => {
  // console.log('[transformSuggestedEntries] entries', entries);
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='h-full w-full object-cover text-yellow-600' />,
        preview: <Icon icon='ic:baseline-folder' className='h-32 w-32 text-yellow-600' />,
        id: entry.id,
        owner: entry.owner,
        fileType: entry.mime_type,
        lastModified: new Date(entry.updated_at),
        size: entry.size,
        parent: entry.parent,
        log: entry.log ? {...entry.log, ...{created_at: new Date(entry.log.created_at)}} : {created_at: new Date()},
      } as SuggestedEntry;
    }
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileTypeIcons[ext] || fileTypeIcons.any;
    return {
      isDir: false,
      title: entry.name,
      icon: icon,
      preview: entry.thumbnail ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_API}${entry.thumbnail}`}
          alt={entry.name}
          className='h-full w-full object-cover'
          draggable={false}
        />
      ) : (
        <div className='h-16 w-16'>{icon}</div>
      ),
      id: entry.id,
      owner: entry.owner,
      lastModified: new Date(entry.updated_at),
      fileType: entry.type,
      size: entry.size,
      parent: entry.parent,
      log: { ...entry.log, ...{ created_at: new Date(entry.log.created_at) } } as LogEntry,
    } as SuggestedEntry;
  });
};
