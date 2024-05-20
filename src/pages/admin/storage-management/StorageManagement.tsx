import { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Dropdown, Menu, MenuProps, Pagination, Table } from 'antd';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { PagingState, initialPagingState } from '@/utils/types/paging-stage.type';
import { listStorages } from '@/apis/admin/storage/list-storage.api';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { FilerDataDto } from './filter/FilterTable';
import { Path } from '@/store/my-drive/myDrive.store';
import { getListEntries, getListEntriesPageMyDrive } from '@/apis/drive/drive.api';
import { Icon } from '@iconify/react/dist/iconify.js';
import { numToSize } from '@/utils/function/numbertToSize';
import { useDeleteMutation, useRenameMutation } from '@/hooks/drive.hooks';
import { SettingsApplications } from '@mui/icons-material';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';

const StorageManagement = () => {
  const initPage = { page: 1, size: 10, totalPage: 1 } as PagingState;
  const [paging, setPaging] = useState<PagingState>(initPage);
  const [path, setPath] = useState<Path>([{ id: '/', name: '/' }]);
  const [fileViewer, setFileViewer] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<FilerDataDto>(null);
  const [result, setResult] = useState(false);

  const renameMutation = useRenameMutation();
  const deleteMutation = useDeleteMutation();

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

  const handleRename = (record: FilerDataDto) => {
    setSelected(record);
    setRenameModal(true);
  };

  const handleDelete = (record: FilerDataDto) => {
    setSelected(record);
    setDeleteModal(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: FilerDataDto) => {
        return (
          <div className='flex items-center gap-1 '>
            {record.is_dir && <Icon icon='mdi:folder' />}
            <div className='statement-medium'>{record.name}</div>
          </div>
        );
      },
    },
    {
      title: 'File type',
      dataIndex: 'filetype',
      key: 'filetype',
      render: (_, record: FilerDataDto) => {
        return <p className='flex justify-end break-keep'>{record.type ? record.type : 'Folder'}</p>;
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (_, record: FilerDataDto) => <div className='truncate text-end '>{record.size && numToSize(record.size)}</div>,
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (_, record: FilerDataDto) => {
        return <div className=''>{formatDate(record.created)}</div>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'actions',
      render: (_, record: FilerDataDto) => {
        return (
          <Dropdown
            key={record.id}
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item icon={<Icon icon='ic:round-drive-file-rename-outline' />} onClick={() => handleRename(record)}>
                  Rename
                </Menu.Item>
                <Menu.Item icon={<Icon icon='fa:trash-o' />} onClick={() => handleDelete(record)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
            placement='bottomLeft'>
            <Button type='dashed'>
              <div className='flex h-full items-center'>
                <SettingsApplications />
                Actions
              </div>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className='h-full w-full overflow-y-auto   '>
        {fileViewer && (
          <FileViewerContainer
            open={fileViewer}
            closeOutside={() => {
              setFileViewer(false);
            }}
            fileInfo={{
              isDir: false,
              title: selected.name,
              icon: <Icon icon='mdi:file' />,
              preview: '',
              id: selected.id,
              owner: null,
              lastModified: new Date(), // TODO
              size: 0,
              fileType: selected.type,
            }}
          />
        )}
        {renameModal && (
          <RenamePopUp open={renameModal} handleClose={() => setRenameModal(false)} name={selected.name} id={selected.id} />
        )}
        {deleteModal && (
          <DeletePopUp
            open={deleteModal}
            handleClose={() => setDeleteModal(false)}
            setResult={setResult}
            title={selected.name}
            source_ids={[selected.id]}
          />
        )}
        <div className='mb-5 text-2xl font-semibold'>Storage Management</div>
        <div className='flex w-full min-w-fit flex-col px-3'>
          <div className='mb-[20px]'>
            <Breadcrumb
              items={path.map((item) => ({
                title: <a>{item.name}</a>,
                onClick: () => {
                  // console.log('[Breadcrumb] path after', path.slice(0, path.indexOf(item) + 1));
                  setPaging(initPage);
                  setPath && setPath(path.slice(0, path.indexOf(item) + 1));
                },
              }))}
            />
          </div>
          <Card className='mx-5 dark:border-none ' loading={data == null}>
            {data && (
              <>
                <Table
                  dataSource={data.data}
                  columns={columns}
                  bordered={true}
                  pagination={false}
                  rowKey={(record) => record.id}
                  onRow={(record: FilerDataDto) => {
                    return {
                      onDoubleClick: () => {
                        if (record.is_dir) {
                          setPath((prev) => [...prev, { id: record.id, name: record.name }]);
                        } else {
                          setFileViewer(true);
                          setSelected(record);
                        }
                      },
                    };
                  }}
                />

                <Pagination
                  current={data.paging.page}
                  pageSize={data.paging.size}
                  total={data.paging.count}
                  onChange={handlePageChange}
                  style={{ marginTop: 16, textAlign: 'right' }}
                />
              </>
            )}
          </Card>
        </div>
      </div>
    </>
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
        }) as FilerDataDto,
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
        }) as FilerDataDto,
    ),
  };
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default StorageManagement;
