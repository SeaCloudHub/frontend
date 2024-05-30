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
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import CustomBreadcums from '@/components/core/pop-up/CustomBreadcums';
import { Path } from '@/store/my-drive/myDrive.store';

type FileFolderResultProps = {
  data: { entries: LocalEntry[]; pagination: PaginationRESP };
  handlePageChange: (page: number) => void;
  handleOnRow: (record: LocalEntry) => void;
  parentPath: Path;
  handlePathChange: (id: string, name: string) => void;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record: LocalEntry) => {
      return (
        <div className='flex items-center gap-1 select-none'>
          <div className='h-8 w-8'>{record.icon}</div>
          <Tooltip title={record.title}>
            <div className='statement-medium truncate max-w-[200px]'>{record.title}</div>
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
      return <div className='truncate text-end select-none'>{formatDate(record.lastModified)}</div>
    }
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
        <Dropdown
          key={record.id}
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item icon={<Icon icon='ic:round-drive-file-rename-outline' />} onClick={() => {}}>
                Rename
              </Menu.Item>
              <Menu.Item icon={<Icon icon='fa:trash-o' />} onClick={() => {}}>
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

const FileFolderResult = ({ data, handlePageChange, handleOnRow, parentPath, handlePathChange }: FileFolderResultProps) => {
  console.log(data?.pagination);


  return (
    <div className='h-full w-full overflow-y-auto overflow-x-hidden pt-2'>
      <CustomBreadcums path={parentPath} onClick={handlePathChange} />
      {data &&
        <div className='h-full mt-3 mb-1'>
          <Table
            dataSource={data.entries}
            columns={columns}
            bordered={true}
            pagination={false}
            rowKey={(record) => record.id}
            onRow={(record: LocalEntry) => {
              return {
                onDoubleClick: () => handleOnRow(record),
              };
            }}
          />

          <Pagination
            current={data.pagination.current_page}
            pageSize={data.pagination.limit}
            total={data.pagination.total_pages * data.pagination.limit}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: 'right' }}
          />
        </div>
      }
    </div>
  );
};

export default FileFolderResult;


{/* <div className='flex w-full items-center border-b py-1'>
          <div className=' flex w-[50%]  items-center space-x-2'>
            <p className='statement-upper-medium'>Name</p>
            <Order
              iconDown='teenyicons:down-solid'
              iconUp='teenyicons:up-solid'
              onChange={(isAscending: boolean) => {
                handleOnChangeOrder('name', isAscending);
              }}
            />
          </div>
          {!responsive && (
            <div className='flex w-[50%] items-center  justify-end truncate'>
              <p className='statement-upper-medium w-1/3'>Owner</p>
              <div className='flex w-1/3 items-center '>
                <DropdownCore options={fileOperations} isDefault={true} />
                <Order
                  iconDown='ph:arrow-down-bold'
                  iconUp='ph:arrow-up-bold'
                  onChange={(isAscending: boolean) => {
                    handleOnChangeOrder('name', isAscending);
                  }}
                />
              </div>
              <div className='w flex w-1/3 items-center justify-end '>
                <p className='statement-upper-medium'>Size</p>
                <Order
                  iconDown='ph:arrow-down-bold'
                  iconUp='ph:arrow-up-bold'
                  onChange={(isAscending: boolean) => {
                    handleOnChangeOrder('name', isAscending);
                  }}
                />
              </div>
            </div>
          )}
        </div> */}
        {/* Content section */}
        {/* {processedEntries.map((item, index) => (
          <div className='flex w-full items-center border-b py-2' key={index}>
            <div className='w-[50%] items-center justify-start space-x-2'>
              <p className=' truncate'>{item.title}</p>
            </div>
            {!responsive && (
              <div className='flex w-[50%] items-center justify-end'>
                <p className='w-1/3 truncate'>{item.owner && ''}</p>
                <p className='w-1/3 truncate'>{formatDate(item.lastModified)}</p>
                <p className='w-1/3  truncate pr-4 text-end'>{item.size}</p>
              </div>
            )}
          </div>
        ))} */}