import React, { useState } from 'react';
import DropdownCore from '../../../../../../components/core/input/DropdownCore';
import TextInputCore from '../../../../../../components/core/input/TextInputCore';
import { fileTypes, storageTypes } from '../../../../../../utils/constants/dopdown.constant';
import { StrorageType } from '../../../../../../utils/enums/dropdown.enum';
import { isEnumValue } from '../../../../../../utils/function/checkValidEnum';
import FilleFolderResult from './FilleFolderResult';
import { LocalEntry, useGetListFilesUser, useListEntries, usePathParents } from '@/hooks/drive.hooks';
import { UserManagementInfoDto } from '@/apis/admin/user-management/dto/user-management-info.dto';
import { formatDate } from '@/utils/function/formatDate.function';
import { numToSize } from '@/utils/function/numbertToSize';
import { Button, Dropdown, Menu } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SettingsApplications } from '@mui/icons-material';

type FileFolderFilterProps = {
  // onFilter: (value: boolean) => void;
  userDTO: UserManagementInfoDto;
};

const FileFolderFilter: React.FC<FileFolderFilterProps> = ({ userDTO }) => {

  const [name, setName] = useState('');
  const [type, setType] = useState(storageTypes[0].value);
  const [fileType, setFileType] = useState(fileTypes[0].value);

  const [page, setPage] = useState(1);
  const [isRoot, setIsRoot] = useState(true);
  const [dirId, setDirId] = useState<string>(userDTO?.root_id);

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
  const { data, isLoading } = useGetListFilesUser(page, dirId, isRoot);
  console.log(data);

  return (
    <div className='py-3'>
      <div className='rounded-xl p-2 dark:bg-[#031525] dark:text-white'>
        <div className='flex flex-wrap  space-y-2'>
          <TextInputCore className='mr-2' onChange={() => {}} label='Name' placeholder='name' />
          <DropdownCore
            className='mr-3'
            onChange={(value) => {
              setType(value!);
            }}
            options={storageTypes}
            isDefault
            label='Type'
          />
          {isEnumValue(StrorageType, type) == StrorageType.FILE && (
            <DropdownCore options={fileTypes} isDefault label='File type' />
          )}
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
