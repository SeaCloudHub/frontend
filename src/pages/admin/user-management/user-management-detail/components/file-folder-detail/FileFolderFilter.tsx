import React, { useState } from 'react';
import DropdownCore from '../../../../../../components/core/input/DropdownCore';
import TextInputCore from '../../../../../../components/core/input/TextInputCore';
import FilleFolderResult from './FilleFolderResult';
import { LocalEntry, useGetListFilesUser, usePathParents } from '@/hooks/drive.hooks';
import { UserManagementInfoDto } from '@/apis/admin/user-management/dto/user-management-info.dto';
import { Icon } from '@iconify/react/dist/iconify.js';
import { typeFilterItems } from '@/utils/constants/type-filter.constant';
import { TypeEntry } from '@/apis/drive/drive.request';
import { useFilter } from '@/store/my-drive/myDrive.store';
import { modifiedFilterItems } from '@/utils/constants/modified-filter.constant';
import { useDebounce } from '@/hooks/useDebounce';

type FileFolderFilterProps = {
  userDTO: UserManagementInfoDto;
};

const FileFolderFilter: React.FC<FileFolderFilterProps> = ({ userDTO }) => {

  const [name, setName] = useState('');

  const [page, setPage] = useState(1);
  const [isRoot, setIsRoot] = useState(true);
  const [dirId, setDirId] = useState<string>(userDTO?.root_id);

  const { setModifiedFilter, setTypeFilter } = useFilter();

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  const handleOnRow = (record: LocalEntry) => {
    if (record.isDir) {
      setDirId(record.id);
      setIsRoot(false);
      setPage(1);
    }
  };

  const { parents } = usePathParents(dirId, true);
  const query = useDebounce({ delay: 260, value: name });
  const { data, isLoading } = useGetListFilesUser(page, dirId, isRoot, query);


  return (
    <div className='py-3 overflow-x-auto overscroll-x-auto'>
      <div className='rounded-xl p-2 dark:bg-[#031525] dark:text-white'>
        <div className='flex items-center flex-wrap space-y-2'>
          <TextInputCore
            className='mr-2'
            onChange={(data: string) => {
              console.log(data);
              setName(data)
            }}
            value={name}
            label='Name'
            placeholder='name'
          />
          <DropdownCore
            className='mr-3'
            onChange={(value) => {
              setTypeFilter(value as TypeEntry);
            }}
            options={[
              { label: 'All', value: '', preIcon: <Icon icon='fluent:border-all-20-regular' /> },
              ...typeFilterItems.map((item) => ({
                label: item.label,
                value: item.label,
                preIcon: <Icon icon={item.icon} />,
              })),
            ]}
            label='Type'
            isDefault
          />
          <DropdownCore
            className='mr-3'
            onChange={(value) => {
              setModifiedFilter(value);
            }}
            options={[
              ...[{ label: 'All', value: '' }],
              ...modifiedFilterItems.map((item) => ({
                label: item.label,
                value: item.value,
              }))
            ]}
            isDefault
            label='Modified'
          />
        </div>
        <FilleFolderResult
          data={data}
          handlePageChange={handlePageChange}
          handleOnRow={handleOnRow}
          parentPath={parents}
          handlePathChange={(id, name) => {
            setDirId(id);
            setIsRoot(false);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default FileFolderFilter;
