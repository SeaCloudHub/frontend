import { Checkbox } from '@mui/material';
import TablePagination from '../../../../components/core/table/TablePagination';
import React from 'react';
import ListMemberFileManagement from './ListMemberFileManagement';
import ButtonContainer from '../../../../components/core/button/ButtonContainer';
import IconifyIcon from '../../../../components/core/Icon/IConCore';
import FileManagementAction from '../file-management-action/FileManagementAction';

export type FileRow = {
  id: string;
  checkbox?: React.ReactNode;
  check?: boolean;
  name: string;
  type: string;
  size: string;
  date: string;
  path?: string;
  member: string[];
};

const dataFile: FileRow[] = [
  {
    id: '1',
    name: 'file 1',
    type: 'folder',
    size: '1.5MB',
    date: '2021-10-10',
    member: ['user1', 'user2', 'user1', 'user2', 'user1', 'user2', 'user1', 'user2'],
  },
  {
    id: '2',
    name: 'file 2',
    type: 'folder',
    size: '2.5MB',
    date: '2021-10-11',
    member: ['user3', 'user4'],
  },
  {
    id: '3',
    name: 'file 3',
    type: 'file',
    size: '3.5MB',
    date: '2021-10-12',
    member: ['user5', 'user6'],
  },
  {
    id: '4',
    name: 'file 4',
    type: 'file',
    size: '4.5MB',
    date: '2021-10-13',
    member: ['user7', 'user8'],
  },
  {
    id: '5',
    name: 'file 5',
    type: 'file',
    size: '5.5MB',
    date: '2021-10-14',
    member: ['user9', 'user10'],
  },
  {
    id: '6',
    name: 'file 6',
    type: 'file',
    size: '6.5MB',
    date: '2021-10-15',
    member: ['user11', 'user12'],
  },
  {
    id: '7',
    name: 'file 7',
    type: 'file',
    size: '7.5MB',
    date: '2021-10-16',
    member: ['user13', 'user14'],
  },
  {
    id: '8',
    name: 'file 8',
    type: 'file',
    size: '8.5MB',
    date: '2021-10-17',
    member: ['user15', 'user16'],
  },
  {
    id: '9',
    name: 'file 9',
    type: 'file',
    size: '9.5MB',
    date: '2021-10-18',
    member: ['user17', 'user18'],
  },
  {
    id: '10',
    name: 'file 10',
    type: 'file',
    size: '10.5MB',
    date: '2021-10-19',
    member: ['user19', 'user20'],
  },
  {
    id: '11',
    name: 'file 11',
    type: 'file',
    size: '11.5MB',
    date: '2021-10-20',
    member: ['user21', 'user22'],
  },
];

const FileTableManagement = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);

  const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleHeaderCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = dataFile.map((item) => item.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  return (
    <>
      {selected && selected.length > 0 && (
        <div className='mb-1 flex justify-end gap-1'>
          <ButtonContainer
            title='Delete'
            icon={<IconifyIcon icon={'ic:baseline-delete'} />}
            background='#ff3338'
            backgroundHover='red'
          />
          <ButtonContainer
            title='Download'
            icon={<IconifyIcon icon={'ic:baseline-get-app'} />}
            background='#11bb1f'
            backgroundHover='#22aa1f'
          />
          <ButtonContainer title='Move' icon={<IconifyIcon icon={'ic:baseline-open-in-new'} />} />
        </div>
      )}
      <TablePagination
        columns={[
          {
            id: 'checkbox',
            label: (
              <Checkbox
                sx={{
                  color: 'white',
                }}
                checked={selected.length === dataFile.length}
                indeterminate={selected.length > 0 && selected.length < dataFile.length}
                onChange={handleHeaderCheckboxChange}
              />
            ),
            minWidth: 5,
            width: 10,
            align: 'center',
            noneSort: true,
          },
          { id: 'name', label: 'Name', minWidth: 100 },
          { id: 'type', label: 'Type', width: 560 },
          { id: 'size', label: 'Size', width: 72 },
          { id: 'date', label: 'Date', width: 142 },
        ]}
        data={dataFile.map((item) => ({
          ...item,
          checkbox: <Checkbox checked={selected.includes(item.id)} onChange={handleCheckboxChange(item.id)} />,
        }))}
        paging={{
          page: page,
          size: 5,
          totalPage: Math.ceil(dataFile.length / 5),
        }}
        renderCell={{
          checkbox: (row: FileRow) => row.checkbox,
          name: (row: FileRow) => (
            <div className='flex items-center'>
              <div>
                <IconifyIcon
                  icon={row.type === 'folder' ? 'ic:round-folder' : 'ic:round-insert-drive-file'}
                  className={`mr-3 h-10 w-10 ${row.type === 'folder' ? 'text-[#f9a825]' : 'text-[#3f51b5]'}`}
                />
              </div>
              <div>
                <div>{row.name}</div>
                <i>{row.size}</i>
              </div>
            </div>
          ),
          date: (row: FileRow) => <div>{row.date}</div>,
          member: (row: FileRow) => (
            <ListMemberFileManagement members={row.member.map((member) => ({ name: member, imgSrc: '' }))} />
          ),
        }}
        onPageChange={(page) => setPage(page)}
        action
        onClick={(row: FileRow) => {
          console.log(row);
        }}
        Element={<FileManagementAction />}
      />
    </>
  );
};

export default FileTableManagement;
