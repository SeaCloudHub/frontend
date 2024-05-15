import { useEffect, useState } from 'react';
import FileTableManagement from './file-table-management/FileTableManagement';
import StorageTree, { StorageItem } from './storage-management-tree/StorageTree';
import { Filer } from './filter/Filer';
import { Pagination } from 'antd';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { PagingState, initialPagingState } from '@/utils/types/paging-stage.type';
import { listStorages } from '@/apis/admin/storage/list-storage.api';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { FilerDataType } from './filter/FilterTable';
import { LinearProgress } from '@mui/material';
import { Path } from '@/store/my-drive/myDrive.store';
import { getListEntries, getListEntriesPageMyDrive } from '@/apis/drive/drive.api';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { ListStoragesRESP } from '@/apis/admin/storage/response/list-storage.response';
import { ListEntriesPageRESP } from '@/apis/drive/drive.response';

const StorageManagement = () => {
  const [paging, setPaging] = useState<PagingState>({ page: 1, size: 5, totalPage: 1 });
  const [path, setPath] = useState<Path>([{ id: '/', name: '/' }]);

  const { data, error, isFetching } = useQuery({
    queryKey: ['list-storages', path[path.length - 1].id, paging.page],
    queryFn: () =>
      path.length === 1
        ? listStorages({ limit: paging.size, page: paging.page })
        : getListEntriesPageMyDrive({ id: path[path.length - 1].id, page: paging.page, limit: paging.size }),
    staleTime: 5000,
    select: path.length === 1 ? transformRootData : transformData,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    }
  }, [error, data]);

  const handlePageChange = (page: number) => {
    setPaging((prev) => ({ ...prev, page }));
  };

  return (
    <div className='h-full w-full overflow-y-auto   '>
      <div className='mb-5 text-2xl font-semibold'>Storage Management</div>
      <div className='w-full min-w-fit px-3'>
        {isFetching ? (
          <LinearProgress className='translate-y-1' />
        ) : (
          data && (
            <>
              <Filer data={data.data} setPath={setPath} path={path} />
              <Pagination
                current={data.paging.page}
                pageSize={data.paging.size}
                total={data.paging.totalPage * data.paging.size}
                onChange={handlePageChange}
                style={{ marginTop: 16, textAlign: 'right' }}
                className='bg-white '
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

const transformRootData = (data) => {
  return {
    paging: {
      page: data.data.pagination.current_page,
      size: data.data.pagination.limit || 100,
      totalPage: data.data.pagination.total_pages,
      count: data.data.pagination.total_items,
      hasMore: data.data.pagination.next_page !== null,
    } as PagingState,
    data: data.data.user_root_directories.map(
      (item) =>
        ({
          id: item.id,
          name: item.name,
          is_dir: item.is_dir,
          type: item.is_dir ? null : item.mime_type,
          size: item.is_dir ? null : item.size,
          created: new Date(item.created_at),
          is_root: true,
        }) as FilerDataType,
    ),
  };
};

const transformData = (data) => {
  return {
    paging: {
      page: data.data.pagination.current_page,
      size: data.data.pagination.limit || 100,
      totalPage: data.data.pagination.total_pages,
      count: data.data.pagination.total_items,
      hasMore: data.data.pagination.next_page !== null,
    } as PagingState,
    data: data.data.entries.map(
      (item) =>
        ({
          id: item.id,
          name: item.name,
          is_dir: item.is_dir,
          type: item.is_dir ? null : item.mime_type,
          size: item.is_dir ? null : item.size,
          created: new Date(item.created_at),
          is_root: false,
        }) as FilerDataType,
    ),
  };
};

export default StorageManagement;
