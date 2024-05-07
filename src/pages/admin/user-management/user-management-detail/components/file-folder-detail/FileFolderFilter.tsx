import { useState } from 'react';
import DropdownCore from '../../../../../../components/core/input/DropdownCore';
import TextInputCore from '../../../../../../components/core/input/TextInputCore';
import { fileTypes, storageTypes } from '../../../../../../utils/constants/dopdown.constant';
import { StrorageType } from '../../../../../../utils/enums/dropdown.enum';
import { isEnumValue } from '../../../../../../utils/function/checkValidEnum';
import FilleFolderResult from './FilleFolderResult';

type FileFolderFilterProps = {
  onFilter: (value: boolean) => void;
};

const FileFolderFilter = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState(storageTypes[0].value);
  const [fileType, setFileType] = useState(fileTypes[0].value);
  return (
    <div className='py-3'>
      <div className='rounded-xl  p-2 dark:bg-[#031525] dark:text-white'>
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
        <FilleFolderResult />
      </div>
    </div>
  );
};

export default FileFolderFilter;
