import React from 'react';
import PopUp from './PopUp';
import { Tab } from '@headlessui/react';
import { Button, Chip, DialogActions, Stack, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

type MovePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title : string;
  location: 'My Drive' | string;
};

const tab=[
  'Propose',
  'Starred',
  'All location'
]

const fakeFolder = [
  {title: 'Folder 1', location: 'My Drive'},
  {title: 'Folder 2', location: 'My Drive'},
  {title: 'Folder 3', location: 'My Drive'},
  {title: 'Folder 4', location: 'My Drive'},
  {title: 'Folder 5', location: 'My Drive'},
  {title: 'Folder 6', location: 'My Drive'},
  {title: 'Folder 7', location: 'My Drive'},
  {title: 'Folder 8', location: 'My Drive'},
  {title: 'Folder 9', location: 'My Drive'},
  {title: 'Folder 10', location: 'My Drive'},
  {title: 'Folder 11', location: 'My Drive'},
  {title: 'Folder 12', location: 'My Drive'},
];

const MovePopUp: React.FC<MovePopUpProps> = ({ open, handleClose, title, location }) => {
  const [stackFolder, setStackFolder] = React.useState<string[]>([]);
  return (
    <PopUp open={open} handleClose={handleClose}>
      <div className='h-[450px] max-w-[600px] font-semibold'>
        <div className='p-3'>
          <Tooltip title={title}>
            <div className='text-xl font-semibold line-clamp-1 mb-2'> Move '{title}' </div>
          </Tooltip>
          <div className='flex items-center gap-3'>
            <span>Current position:</span>
            <Stack direction="row" spacing={1} className='max-w-60'>
              <Chip
                icon={ <Icon
                  icon={location === 'My drive' ? 'mingcute:drive-line' : 'material-symbols:folder-outline' }
                  className='text-xl' />
                }
                label={location}
                variant="outlined"
                sx={{ p: 1 }}
                />
            </Stack>
          </div>
        </div>
        {stackFolder.length === 0 ? (
          <Tab.Group>
            <div className='w-full h-[280px] md:w-[580px] lg:w-[600px] sm:w-[500px]'>
              <Tab.List className='flex gap-5 w-full px-3' >
                {tab.map((item, index) => (
                  <Tab className='flex focus:outline-none'>
                  {({ selected }) => (
                    <div className={`flex grow justify-center active:bg-[#c7d8f4] ${ selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]'}`}>
                      <div className={`min-w-max w-14 py-3 text-sm font-medium ${ selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : ''}`}>
                        {item}
                      </div>
                    </div>
                  )}
                </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='w-full h-[200px] overflow-y-auto mt-3 font-normal px-3'>
                <Tab.Panel className={'h-40 overscroll-y-auto'}>
                  {fakeFolder.map((item, index) => (
                    <div key={index} className='flex items-center gap-3 cursor-pointer hover:bg-gray-100'
                      onDoubleClick={() => setStackFolder([...stackFolder, item.title])}
                    >
                      <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group> ) : (
          <div className='flex flex-col w-full h-[280px] md:w-[580px] lg:w-[600px] sm:w-[500px] gap-3 px-3'>
            <div className='flex gap-1 items-center'>
              <Icon icon='octicon:arrow-left-16'
                className='text-xl cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6'
                onClick={ () => setStackFolder(stackFolder.slice(0, stackFolder.length - 1))}
              />
              <span>
                {stackFolder[stackFolder.length - 1]}
              </span>
            </div>
            <div className={'w-full h-60 overflow-y-auto font-normal'}>
              {fakeFolder.map((item, index) => (
                <div key={index} className='flex items-center gap-3 cursor-pointer hover:bg-gray-100'
                  onDoubleClick={() => setStackFolder([...stackFolder, item.title])}
                >
                  <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='px-3'>
          <div className='text-xs flex gap-2 items-center'>
            <Icon icon='mingcute:drive-line' className='text-xl' />
            <span>Select a location to display the folder path</span>
          </div>
        </div>
        <DialogActions className='flex justify-end'>
          <Button onClick={handleClose} color='primary'>Cancel</Button>
          <Button onClick={handleClose} variant='contained'
          sx={{
            backgroundColor: '#0B57D0',
            '&:hover': {
              backgroundColor: '#0B5A9',
            },
          }}>Move</Button>
        </DialogActions>
      </div>
    </PopUp>
  );
};

export default MovePopUp;