import { ModifyStorageCapacityREQ } from '@/apis/admin/user-management/request/user-action.request';
import { getFileUserApi, modifyStorageCapacityApi } from '@/apis/admin/user-management/user-management.api';
import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import {
  copyFiles,
  deleteEntries,
  downloadFile,
  downloadMultipleEntries,
  getAccessEntries,
  getActivityLog,
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
  DeleteEntriesREQ,
  RenameREQ,
  RestoreEntriesREQ,
  StarEntriesREQ,
  DownloadMultipleEntriesREQ,
  UpdateGeneralAccessREQ,
} from '@/apis/drive/drive.request';
import {
  EntryMetadataRES,
  EntryRESP,
  LocalActivityLog,
  LogEntry,
  LogItem,
  ParentRES,
  SuggestedEntriesRESP,
} from '@/apis/drive/drive.response';
import { MoveToTrashREQ } from '@/apis/drive/request/move-to-trash.request';
import { UpdateAccessREQ } from '@/apis/user/storage/request/update-access.request';
import { updateAccessApi, updateGeneralAccessApi, uploadFilesApi } from '@/apis/user/storage/storage.api';
import { LocalEntryToTimeEntry } from '@/pages/user/trash/trash-page-view/DriveHistoryGridView';
import {
  Path,
  useActivityLogStore,
  useCursor,
  useCursorActivity,
  useCursorSearch,
  useDrawer,
  useEntries,
  useFilter,
  useIsFileMode,
  useSelected,
} from '@/store/my-drive/myDrive.store';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { fileTypeIcons } from '@/utils/constants/file-icons.constant';
import { fileTypes } from '@/utils/constants/file-types.constant';
import { formatDate } from '@/utils/function/formatDate.function';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { UserRole } from '@/utils/types/user-role.type';
import { Icon } from '@iconify/react/dist/iconify.js';
import { QueryKey, keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const usePathParents = (dir?: string, is_admin?: boolean) => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dir || dirId || rootId;

  const { data: parents, error: parentsError } = useQuery({
    queryKey: ['path-parrent', id],
    queryFn: async () => {
      const res = await getEntryMetadata({ id }).then((res) => res?.data);
      return res;
    },
    staleTime: 10 * 1000,
    select: (data): { id: string; name: string; userRoles: UserRole[]; is_starred: boolean }[] => {
      if (data.parents) {
        data.parents.sort((a, b) => a.path.localeCompare(b.path));
        const path = data.parents.map((parent, ind) => {
          if (ind === 0)
            return {
              id: !is_admin ? rootId : parent.id,
              name: !is_admin ? (parent.id !== rootId ? 'Shared with me' : 'My Drive') : 'Root',
              userRoles: ['owner'] as UserRole[],
              is_starred: data.file.is_starred,
            };
          else
            return {
              id: parent.id,
              name: parent.name,
              userRoles: data.file.userRoles,
              is_starred: data.file.is_starred,
            };
        });
        path.push({ id: data.file.id, name: data.file.name, userRoles: data.file.userRoles, is_starred: data.file.is_starred });
        return path;
      }
      return [
        {
          id: is_admin ? dir : rootId,
          name: is_admin ? 'Root' : 'My Drive',
          userRoles: ['owner'] as UserRole[],
          is_starred: false,
        },
      ];
    },
  });

  // if (isAxiosError<ApiGenericError>(parentsError)) {
  //   toast.error(parentsError.response?.data.message, toastError());
  // }

  return {
    parents: parents || [{ id, name: 'My Drive', userRoles: ['owner'] as UserRole[], is_starred: false }],
    error: parentsError ? (
      isAxiosError<ApiGenericError>(parentsError) ? parentsError.response?.data.message : parentsError.message || 'Something went wrong'
      ) : null,
  };
};

export const useListEntries = (rootUserId?: string) => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const { typeFilter, modifiedFilter } = useFilter();
  const { setNextCursor, nextCursor, currentCursor } = useCursor();

  const id = rootUserId || dirId || rootId;
  const { setListEntries, listEntries } = useEntries();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['mydrive-entries', id, typeFilter, modifiedFilter, currentCursor],
    queryFn: async () => {
      const res = await getListEntries({
        ...{ id, limit: 15, type: typeFilter },
        ...(currentCursor ? { cursor: currentCursor } : {}),
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data);

      return res;
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data) {
      data?.cursor && setNextCursor(data.cursor);
      const entries = transformEntries(data?.entries || []);
      if (!currentCursor) setListEntries(entries);
      else setListEntries(listEntries.concat(entries.filter((entry) => !listEntries.find((e) => e.id === entry.id))));
    }
  }, [data, setListEntries]);

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return {
    data: listEntries,
    refetch,
    isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
      ) : null,
  };
};

export const useListFolders = (volumn?: 'Priority' | 'My Drive' | 'Starred' | 'Shared', dirId?: string) => {
  const { rootId } = useStorageStore();
  if (!dirId) dirId = rootId;
  const { setNextCursorSearch, currentCursorSearch } = useCursorSearch();
  const { folderEntries, setFolderEntries } = useEntries();

  const { parents, error: parentsError } = usePathParents(dirId, false);
  console.log('parents', parents);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['list-folders', dirId, volumn, currentCursorSearch],
    queryFn: async () => {
      if (dirId !== rootId) volumn = 'My Drive';
      switch (volumn) {
        case 'Starred':
          return await getListEntriesPageStarred({ type: 'folder' }).then((res) => res?.data);
        case 'Shared':
          return await getSharedEntries({ type: 'folder' }).then((res) => res?.data);
        case 'Priority': {
          const suggestedEntries = await getListEntriesSuggested({ dir: true, limit: 15 }).then((res) => res?.data);
          return { entries: suggestedEntries, cursor: '' };
        }
        default:
          return await getListEntries({ id: dirId, limit: 15, type: 'folder', cursor: currentCursorSearch }).then(
            (res) => res?.data,
          );
      }
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data) {
      data?.cursor && setNextCursorSearch(data.cursor);
      const entries = transformEntries(data.entries);
      if (!currentCursorSearch) setFolderEntries(entries);
      else setFolderEntries(folderEntries.concat(entries.filter((entry) => !folderEntries.find((e) => e.id === entry.id))));
    }
  }, [currentCursorSearch, data, setFolderEntries, setNextCursorSearch]);

  return { parents: parents || [{ id: dirId, name: 'My Drive' }], data: folderEntries || [], refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : parentsError ? parentsError : null,
  };
};

export const useSuggestedEntries = () => {
  const { isFileMode } = useIsFileMode();
  const { setListSuggestedEntries, listSuggestedEntries } = useEntries();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['suggested-entries', isFileMode ? 'File' : 'Folder'],
    queryFn: async () => {
      const res = await getListEntriesSuggested({ limit: 30, dir: !isFileMode }).then((res) =>
        res?.data?.filter((e) => e.name !== '.trash'),
      );
      return res || [];
    },
    staleTime: 10 * 1000,
    select: transformSuggestedEntries,
  });

  useEffect(() => {
    if (data) setListSuggestedEntries(data);
  }, [data, setListSuggestedEntries]);

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return {
    data: listSuggestedEntries || [],
    refetch,
    isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null,
  };
};

export const useSearchEntries = (query: string) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['search-entries', query],
    queryFn: () => {
      if (!query) return [];
      return searchEntriesApi({ query, limit: 10 }).then((res) => res?.data?.entries || []);
    },
    staleTime: 10 * 1000,
    select: transformSuggestedEntries,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return {
    data: data || [], refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useSearchEntriesPage = () => {
  const query = useQueries().get('q') || '';
  const { currentCursorSearch, setNextCursorSearch } = useCursorSearch();
  const { typeFilter, modifiedFilter } = useFilter();
  const { entriesSearchPage, setEntriesSearchPage } = useEntries();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['search-entries-Page', query, typeFilter, modifiedFilter],
    queryFn: async () => {
      if (!query) return { entries: [], cursor: '' };
      const res = await searchEntriesApi({
        ...{ query, limit: 15, type: typeFilter },
        ...(currentCursorSearch ? { cursor: currentCursorSearch } : {}),
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data);
      return res || { entries: [], cursor: '' };
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data) {
      data.cursor && setNextCursorSearch(data.cursor);
      const entries = transformSuggestedEntries((data.entries || []) as SuggestedEntriesRESP[]);
      if (!currentCursorSearch) setEntriesSearchPage(entries);
      else
        setEntriesSearchPage(
          entriesSearchPage.concat(entries.filter((entry) => !entriesSearchPage.find((e) => e.id === entry.id))),
        );
    }
  }, [data, setEntriesSearchPage]);

  return {
    data: entriesSearchPage,
    refetch,
    isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useQueries = () => {
  return new URLSearchParams(useLocation().search);
};

export const useSharedEntry = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;
  const { modifiedFilter, typeFilter } = useFilter();
  const { setNextCursor, currentCursor } = useCursor();
  const { listEntries, setListEntries } = useEntries();

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
        path.push({ id: data.file.id, name: data.file.name });
        return path;
      }
      return [{ id: rootId, name: 'Shared' }];
    },
  });

  // if (isAxiosError<ApiGenericError>(parentsError)) {
  //   toast.error(parentsError.response?.data.message, toastError());
  // }

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['shared-entries', id, modifiedFilter, typeFilter],
    queryFn: async () => {
      const res = await getSharedEntries({
        limit: 15,
        type: typeFilter,
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
        ...(currentCursor ? { cursor: currentCursor } : {}),
      }).then((res) => res?.data);

      return res;
    },
    staleTime: 10 * 1000,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  useEffect(() => {
    if (data) {
      data?.cursor && setNextCursor(data.cursor);
      if (!currentCursor) setListEntries(transformEntries(data.entries));
      else
        setListEntries(
          listEntries.concat(transformEntries(data.entries).filter((entry) => !listEntries.find((e) => e.id === entry.id))),
        );
    }
  }, [data, setNextCursor]);

  return { parents: parents || [{ id, name: 'Shared' }], data: listEntries || [], refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : parentsError ? (
      isAxiosError<ApiGenericError>(parentsError) ? parentsError.response?.data.message : parentsError.message || 'Something went wrong'
    ) : null
  };
};

export const useTrash = () => {
  const { dirId } = useParams();
  const { rootId } = useStorageStore();
  const id = dirId || rootId;
  const { setNextCursor, currentCursor } = useCursor();
  const { trashEntries, setTrashEntries } = useEntries();
  const { modifiedFilter, typeFilter } = useFilter();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['Trash-entries', id, currentCursor, modifiedFilter, typeFilter],
    queryFn: async () => {
      const res = await getListEntriesTrash({ limit: 15, cursor: currentCursor,
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
        ...(typeFilter ? { type: typeFilter } : {}),
      }).then((res) => res?.data);
      return {entries: transformEntries(res?.entries || []), cursor: res.cursor || ''};
    },
    staleTime: 10 * 1000,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  useEffect(() => {
    if (data) {
      data.cursor && setNextCursor(data.cursor);
      const temp = LocalEntryToTimeEntry(data.entries);
      if (!currentCursor) setTrashEntries(temp);
      else {
        let result = trashEntries.map((entry) => {
          if (temp.find((e) => e.time === entry.time)) {
            // concat những file không có
            entry.entries = entry.entries.concat(
              temp.find((e) => e.time === entry.time)?.entries.filter((e) => !entry.entries.find((en) => en.id === e.id)) || [],
            );
          }
          return entry;
        });
        result = result.concat(temp.filter((entry) => !result.find((e) => e.time === entry.time)));
        setTrashEntries(result);
      }
    }
  }, [data, setTrashEntries]);

  return {
    data: trashEntries, refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useCopyMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries } = useEntries();

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
      setListEntries(listEntries.concat(transformEntries(data.data)));
      toast.success('Created ' + (data.data.length > 1 ? `${data.data.length} files` : `${data.data[0].name}`));
    },
  });
};

export const useRenameMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries, setListSuggestedEntries, listSuggestedEntries } = useEntries();

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
      setListEntries(listEntries.map((entry) => (entry.id === data.data.id ? { ...entry, title: data.data.name } : entry)));
      toast.success(`Renamed to ${data.data.name}`);
      queryClient.invalidateQueries({ queryKey: ['suggested-entries'] });
      queryClient.invalidateQueries({ queryKey: ['entry-metadata'] });
      queryClient.invalidateQueries({ queryKey: ['list-files-user'] });
    },
  });
};

export const useRenameMutationV2 = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries, setListSuggestedEntries, listSuggestedEntries } = useEntries();

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
      setListEntries(listEntries.map((entry) => (entry.id === data.data.id ? { ...entry, title: data.data.name } : entry)));
      toast.success(`Renamed to ${data.data.name}`);
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export const useDownloadMutation = () => {
  return useMutation({
    mutationFn: (body: { id: string; name?: string }) => {
      console.log(body);
      return downloadFile(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      toast.success('Downloaded');
    },
    onMutate: (body) => {
      toast.info('Downloading...');
    },
  });
};

export const useDownLoadMultipleMutation = () => {
  return useMutation({
    mutationFn: (body: DownloadMultipleEntriesREQ) => {
      return downloadMultipleEntries(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      toast.success('Downloaded');
    },
    onMutate: (body) => {
      toast.info('Downloading...');
    },
  });
};

export const useMoveToTrashMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries } = useEntries();

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
      setListEntries(listEntries.filter((entry) => !data.data.some((e) => e.id === entry.id)));
      toast.success(`${data.data.length} files moved to trash`);
    },
  });
};

export const useDeleteMutation = () => {
  const { trashEntries, setTrashEntries } = useEntries();
  const client = useQueryClient();

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
      const trash = trashEntries
        .map((entry) => {
          return {
            time: entry.time,
            entries: entry.entries.filter((e) => !data.data.some((d) => d.id === e.id)),
          };
        })
        .filter((entry) => entry.entries.length > 0);
      setTrashEntries(trash);
      toast.success(`${data.data.length} files deleted`);
      client.invalidateQueries({ queryKey: ['list-files-user'] });
    },
  });
};

export const useDeleteMutationV2 = (queryKey?: QueryKey) => {
  const { trashEntries, setTrashEntries } = useEntries();
  const client = useQueryClient();

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
      const trash = trashEntries
        .map((entry) => {
          return {
            time: entry.time,
            entries: entry.entries.filter((e) => !data.data.some((d) => d.id === e.id)),
          };
        })
        .filter((entry) => entry.entries.length > 0);
      setTrashEntries(trash);
      toast.success(`${data.data.length} files deleted`);
      if (queryKey) {
        client.invalidateQueries({ queryKey: queryKey });
      }
    },
  });
};

export const useStarred = () => {
  const { setNextCursor, currentCursor } = useCursor();
  const { modifiedFilter, typeFilter } = useFilter();
  const { listEntries, setListEntries } = useEntries();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['starred-entries', currentCursor, modifiedFilter, typeFilter],
    queryFn: async () => {
      const res = await getListEntriesPageStarred({
        ...{ limit: 15, type: typeFilter },
        ...(currentCursor ? { cursor: currentCursor } : {}),
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data);

      if (res?.cursor) setNextCursor(res.cursor);

      return res?.entries || [];
    },
    staleTime: 10 * 1000,
    select: transformEntries,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  useEffect(() => {
    if (data) {
      if (!currentCursor) setListEntries(data);
      else setListEntries(listEntries.concat(data.filter((entry) => !listEntries.find((e) => e.id === entry.id))));
    }
  }, [data, setListEntries]);

  return {
    data: listEntries || [], refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useStarEntryMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries } = useEntries();

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
    },
  });
};

export const useUnstarEntryMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries } = useEntries();
  const { arrSelected } = useSelected();

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
    },
  });
};

export const useMoveEntriesMutation = () => {
  const queryClient = useQueryClient();
  const { listEntries, setListEntries } = useEntries();
  const { arrSelected, setArrSelected } = useSelected();

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
      setListEntries(listEntries.filter((entry) => !data.data.some((e) => e.id === entry.id)));
      setArrSelected([]);
      toast.success(`${data.data.length} entries moved`);
      queryClient.invalidateQueries({ queryKey: ['priority-entries'] });
      queryClient.invalidateQueries({ queryKey: ['path-parrent'] });
    },
  });
};

export const useRestoreEntriesMutation = () => {
  const queryClient = useQueryClient();
  const { trashEntries, setTrashEntries } = useEntries();

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
      const trash = trashEntries.map((entry) => {
        return {
          time: entry.time,
          entries: entry.entries.filter((e) => !data.data.some((d) => d.id === e.id)),
        };
      });
      setTrashEntries(trash);
      toast.success('files restored');
    },
  });
};

export const useEntryMetadata = (id: string) => {
  const { drawerOpen } = useDrawer();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['entry-metadata', id],
    queryFn: async () => {
      if (!id) return null;
      return await getEntryMetadata({ id }).then((res) => res?.data);
    },
    staleTime: 10 * 1000,
    select: transformMetadata,
    enabled: !!drawerOpen && !!id,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return { data, isLoading, isFetching,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
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

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return { data, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
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

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return {
    data, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useMemory = (asc: boolean) => {
  // const {limit} = useLimit();
  const { currentCursor, setNextCursor } = useCursor();
  const { typeFilter, modifiedFilter } = useFilter();
  const { listEntries, setListEntries } = useEntries();

  const { data, isLoading, error } = useQuery({
    queryKey: ['memory-entries', currentCursor, typeFilter, modifiedFilter, asc],
    queryFn: async () => {
      const res = await getListFileSizes({
        limit: 15,
        asc,
        type: typeFilter,
        ...(currentCursor ? { cursor: currentCursor } : {}),
        ...(modifiedFilter ? { after: modifiedFilter } : {}),
      }).then((res) => res?.data);
      return res;
    },
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  useEffect(() => {
    if (data) {
      data.cursor && setNextCursor(data.cursor);
      const entries = transformEntries(data.entries);
      if (!currentCursor) setListEntries(entries);
      else setListEntries(listEntries.concat(entries.filter((entry) => !listEntries.find((e) => e.id === entry.id))));
    }
  }, [data, setListEntries]);

  return {
    data: listEntries, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useActivityLog = () => {
  const { rootId } = useStorageStore();
  const { arrSelected } = useSelected();
  const { activityLog, setActivityLog } = useActivityLogStore();
  const { currentCursorActivity, setNextCursorActivity } = useCursorActivity();

  const id = arrSelected.length === 1 ? arrSelected[0].id : rootId;

  const { data, isLoading, error } = useQuery({
    queryKey: ['activity-log', id, currentCursorActivity],
    queryFn: async () => {
      const res = await getActivityLog({
        id,
        limit: 15,
        ...(currentCursorActivity ? { cursor: currentCursorActivity } : {}),
      }).then((res) => res?.data);
      return res;
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data) {
      data.cursor && setNextCursorActivity(data.cursor);
      if (!currentCursorActivity) setActivityLog(transformActivityLog(data?.activities || []));
      else {
        const temp = transformActivityLog(data?.activities || []);
        if (activityLog.length > 0) {
          const last = activityLog[activityLog.length - 1];
          const first = temp[0];
          if (last.time === first?.time) {
            last.data = last.data.concat(first.data);
            setActivityLog(activityLog.slice(0, -1).concat(last));
          } else {
            setActivityLog(activityLog.concat(temp));
          }
        }
      }
    }
  }, [data, setActivityLog]);

  return {
    data: activityLog, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

///////////////////  admin //////////////////////
export const useGetListFilesUser = (page: number, id: string, isRoot: boolean, query?: string) => {
  const { userId } = useParams();
  const { modifiedFilter, typeFilter } = useFilter();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['list-files-user', userId, id, page, isRoot, modifiedFilter, typeFilter, query],
    queryFn: async () => {
      const res = isRoot
        ? await getFileUserApi({
            identity_id: userId,
            limit: 8,
            page,
            ...(modifiedFilter ? { after: modifiedFilter } : {}),
            ...(typeFilter ? { type: typeFilter } : {}),
            ...(query ? { query } : {}),
          }).then((res) => res?.data)
        : await getListEntriesPageMyDrive({
            id,
            limit: 8,
            page,
            ...(modifiedFilter ? { after: modifiedFilter } : {}),
            ...(typeFilter ? { type: typeFilter } : {}),
            ...(query ? { query } : {}),
          });
      return res;
    },
    staleTime: 10 * 1000,
    select(data) {
      return { entries: transformEntries(data.data.entries), pagination: data.data.pagination };
    },
    placeholderData: keepPreviousData,
  });

  // if (isAxiosError<ApiGenericError>(error)) {
  //   toast.error(error.response?.data.message, toastError());
  // }

  return {
    data: data, refetch, isLoading,
    error: error ? (
      isAxiosError<ApiGenericError>(error) ? error.response?.data.message : error.message || 'Something went wrong'
    ) : null
  };
};

export const useModifyStorageCapacityMutation = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ModifyStorageCapacityREQ) => {
      return modifyStorageCapacityApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      toast.success('Modified');
      console.log(queryKey);
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export const useUpdateGeneralAccessMutation = () => {
  return useMutation({
    mutationFn: (body: UpdateGeneralAccessREQ) => {
      return updateGeneralAccessApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      toast.success('Changed general access');
    },
  });
}

export const useUpdateAccessMutation = () => {
  return useMutation({
    mutationFn: (body: UpdateAccessREQ) => {
      return updateAccessApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      toast.success('Changed access');
    },
  });
};

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
  userRoles: ('owner' | 'editor' | 'viewer')[];
  fileType?: string;
  is_starred?: boolean;
};

export type SuggestedEntry = LocalEntry & { parent: ParentRES } & { log?: LogEntry };

export const transformEntries = (entries: EntryRESP[]): LocalEntry[] => {
  return entries.map((entry) => {
    return transformEntry(entry);
  });
};

const transformSuggestedEntries = (entries: SuggestedEntriesRESP[]): SuggestedEntry[] => {
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
        userRoles: entry.userRoles,
        is_starred: entry.is_starred,
        parent: entry.parent,
        ...{ log: entry.log && { ...entry.log, ...{ created_at: new Date(entry.log.created_at) } } },
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
          className='h-full w-full select-none object-cover'
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
      userRoles: entry.userRoles,
      is_starred: entry.is_starred,
      parent: entry.parent,
      ...{ log: entry.log && { ...entry.log, ...{ created_at: new Date(entry.log.created_at) } } },
    } as SuggestedEntry;
  });
};

export const transformEntry = (entry: EntryRESP): LocalEntry => {
  if (entry.is_dir) {
    return {
      isDir: entry.is_dir,
      title: entry.name,
      icon: <Icon icon='ic:baseline-folder' className='h-full w-full object-cover text-yellow-600' />,
      preview: <Icon icon='ic:baseline-folder' className='h-32 w-32 object-cover text-yellow-600' />,
      id: entry.id,
      owner: entry.owner,
      fileType: entry.type,
      lastModified: new Date(entry.updated_at),
      size: entry.size,
      userRoles: entry.userRoles,
      is_starred: entry.is_starred,
    } as LocalEntry;
  }
  const ext = entry.name.split('.').pop() || 'any';
  const icon = fileTypeIcons[ext] || fileTypeIcons.any;
  return {
    isDir: entry.is_dir,
    title: entry.name,
    icon: icon,
    preview: entry.thumbnail ? (
      <img
        src={`${import.meta.env.VITE_BACKEND_API}${entry.thumbnail}`}
        alt={entry.name}
        className='h-full w-full select-none object-cover'
        draggable={false}
      />
    ) : (
      <div className='h-16 w-16'>{icon}</div>
    ),
    id: entry.id,
    owner: entry.owner,
    fileType: entry.type,
    lastModified: new Date(entry.updated_at),
    size: entry.size,
    userRoles: entry.userRoles,
    is_starred: entry.is_starred,
  } as LocalEntry;
};

const transformActivityLog = (data: LogItem[]): LocalActivityLog => {
  const result: LocalActivityLog = [];
  data.map((item) => {
    result.push({
      time: formatDate(new Date(item.created_at)),
      data: [
        {
          ...{
            action: item.action,
            timeAction: new Date(item.created_at),
            actor: { name: item.user.email, avatar: item.user.avatar_url },
          },
        },
      ],
    });
  });

  const resultGroup: LocalActivityLog = [];
  result.forEach((item) => {
    const index = resultGroup.findIndex((group) => group.time === item.time);
    if (index === -1) {
      resultGroup.push(item);
    } else {
      resultGroup[index].data.push(item.data[0]);
    }
  });

  return resultGroup;
};
