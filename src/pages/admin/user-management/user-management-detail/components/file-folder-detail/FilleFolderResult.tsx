import { LocalEntry } from '@/hooks/drive.hooks';
import { formatDate } from '@/utils/function/formatDate.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import DropdownCore from '../../../../../../components/core/input/DropdownCore';
import Order from '../../../../../../components/core/order/Order';
import { useScreenHook } from '../../../../../../hooks/useScreenHook';
import { fileOperations } from '../../../../../../utils/constants/dopdown.constant';
import fileTypeIcons from '../../../../../../utils/constants/file-icons.constant';
import { fakeEntries } from '../../../../../../utils/dumps/entries';
import { Entry } from '../../../../../../utils/types/entry.type';
import { Button, Dropdown, Menu, Pagination, Table } from 'antd';
import { numToSize } from '@/utils/function/numbertToSize';
import { SettingsApplications } from '@mui/icons-material';
import { GetUserFileDetailRESP } from '@/apis/admin/user-management/response/get-identities.response';
import { PaginationRESP } from '@/utils/types/api-base-response.type';
import { SetStateAction, useState } from 'react';
import { Tooltip } from '@mui/material';
import CustomBreadcums from '@/components/core/pop-up/CustomBreadcums';
import { Path } from '@/store/my-drive/myDrive.store';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';

type FileFolderResultProps = {
  data: { entries: LocalEntry[]; pagination: PaginationRESP };
  handlePageChange: (page: number) => void;
  handleOnRow: (record: LocalEntry) => void;
  parentPath: Path;
  handlePathChange: (id: string, name: string) => void;
  fileInfoView?: LocalEntry;
  isLoading?: boolean;
};



const FileFolderResult = ({ data, handlePageChange, handleOnRow, parentPath, handlePathChange, fileInfoView, isLoading }: FileFolderResultProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [typePopup, setTypePopup] = useState<string>('');
  const [isViewFile, setIsViewFile] = useState<boolean>(false);
  const [recordSelected, setRecordSelected] = useState<LocalEntry>(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: LocalEntry) => {
        return (
          <div className='flex select-none items-center gap-1'>
            <div className='h-8 w-8'>{record.icon}</div>
            <Tooltip title={record.title}>
              <div className='statement-medium max-w-[200px] truncate'>{record.title}</div>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (_, record: LocalEntry) => {
        return <p className='select-none'>{record?.owner ? record.owner.email : null}</p>;
      },
    },
    {
      title: 'Last modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (_, record: LocalEntry) => {
        return <div className='select-none truncate text-end'>{formatDate(record.lastModified)}</div>;
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (_, record: LocalEntry) => {
        return <div className='select-none'>{record.isDir ? '---' : numToSize(record?.size)}</div>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'actions',
      render: (_, record: LocalEntry) => {
        return (
          <>
            <Dropdown
              key={record.id}
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item
                    icon={<Icon icon='ic:round-drive-file-rename-outline' />}
                    onClick={() => {
                      console.log('Rename');
                      setIsOpened(true);
                      setTypePopup('Rename');
                      setRecordSelected(record);
                    }}>
                    Rename
                  </Menu.Item>
                  <Menu.Item
                    icon={<Icon icon='fa:trash-o' />}
                    onClick={() => {
                      console.log('Delete');
                      setIsOpened(true);
                      setTypePopup('Delete');
                      setRecordSelected(record);
                    }}>
                    Delete
                  </Menu.Item>
                </Menu>
              }
              placement='bottomLeft'>
              <Button type='dashed'>
                <div className='flex items-center'>
                  <SettingsApplications />
                  <span>Actions</span>
                </div>
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isViewFile && (
        <FileViewerContainer
          fileInfo={fileInfoView ? fileInfoView : null}
          open={isViewFile}
          canDelete={true}
          canShare={true}
          closeOutside={() => setIsViewFile(false)}
          isCloseOutside={true}
        />
      )}
      <div className='h-full w-full overflow-y-auto overflow-x-auto pt-2'>
        <CustomBreadcums path={parentPath} onClick={handlePathChange} />
        {data && (
          <div className='h-full mt-3 mb-1'>
            <Table
              dataSource={data.entries}
              columns={columns}
              bordered={true}
              pagination={false}
              rowKey={(record) => record.id}
              onRow={(record: LocalEntry) => {
                return {
                  onDoubleClick: () => {
                    handleOnRow(record);
                    if (!record.isDir) setIsViewFile(true);
                  },
                  style: { cursor: 'pointer' },
                };
              }}
              loading={isLoading}
            />
            <Pagination
              current={data.pagination.current_page}
              pageSize={data.pagination.limit}
              total={data.pagination.total_pages * data.pagination.limit}
              onChange={handlePageChange}
              style={{ marginTop: 16, textAlign: 'right' }}
            />
          </div>
        )}
      </div>

      {isOpened && typePopup === 'Rename' && (
        <RenamePopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          id={recordSelected?.id}
          name={recordSelected?.title}
        />
      )}

      {isOpened && typePopup === 'Delete' && (
        <DeletePopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          source_ids={[recordSelected?.id]}
          title={recordSelected?.title}
          setResult={() => {}}
        />
      )}
    </>
  );
};

export default FileFolderResult;
