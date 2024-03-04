import { Folder } from '@mui/icons-material';
import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import FolderCard from '../core/folder-card/FolderCard';
import FileCard from '../core/file-card/FileCard';

const renderFilters = () => {
  return (
    <>
      <div className='flex flex-row gap-x-2'>
        <FormControl size='sm'>
          <FormLabel>Type</FormLabel>
          <Select size='sm' placeholder='Filter by'>
            <Option value='3'>All types</Option>
            <Option value='1'> Document</Option>
            <Option value='2'>Spreadsheet</Option>
            <Option value='3'>Presentation</Option>
          </Select>
        </FormControl>
        {/* <FormControl size='sm'>
          <FormLabel>People</FormLabel>
          <Select size='sm' placeholder='Filter by'>
            <Option value='1'>All</Option>
            <Option value='2'>Active</Option>
            <Option value='3'>Completed</Option>
          </Select>
        </FormControl> */}
        <FormControl size='sm'>
          <FormLabel>Modified</FormLabel>
          <Select size='sm' placeholder='Filter by'>
            <Option value='3'>All time</Option>
            <Option value='1'>Today </Option>
            <Option value='2'>Last 7 days</Option>
            <Option value='3'>This year</Option>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

const FileBrowser = () => {
  return (
    <div className='flex flex-col'>
      {renderFilters()}
      <div>
        <div className='mt-4 text-lg font-bold'> Folders</div>
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div className='w-64'>
              <FolderCard key={index} title={'Folder ' + index.toString()} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className='mt-4 text-lg font-bold'> Files</div>
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div className='w-64'>
              <FileCard key={index} title={'File ' + index.toString()} size='1MB' />
            </div>
          ))}
          {Array.from({ length: 2 }).map((_, index) => (
            <div className='w-64'>
              <FileCard key={index} title={'File ' + (index + 2).toString() + '.doc'} size='1MB' />
            </div>
          ))}
          {Array.from({ length: 2 }).map((_, index) => (
            <div className='w-64'>
              <FileCard
                key={index}
                title={'File ' + (index + 4).toString() + '.png'}
                size='1MB'
                preview='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;
