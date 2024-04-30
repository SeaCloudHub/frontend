import React from 'react';
import PopUp from './PopUp';
import { Tab } from '@headlessui/react';
import { Button, Chip, DialogActions, Stack, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

type MovePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  location: 'My Drive' | string;
};

const tab = ['Propose', 'Starred', 'All location'];

const fakeFolder = [
  { title: 'Folder 1', location: 'My Drive' },
  { title: 'Folder 2', location: 'My Drive' },
  { title: 'Folder 3', location: 'My Drive' },
  { title: 'Folder 4', location: 'My Drive' },
  { title: 'Folder 5', location: 'My Drive' },
  { title: 'Folder 6', location: 'My Drive' },
  { title: 'Folder 7', location: 'My Drive' },
  { title: 'Folder 8', location: 'My Drive' },
  { title: 'Folder 9', location: 'My Drive' },
  { title: 'Folder 10', location: 'My Drive' },
  { title: 'Folder 11', location: 'My Drive' },
  { title: 'Folder 12', location: 'My Drive' },
];

const MovePopUp: React.FC<MovePopUpProps> = ({ open, handleClose, title, location }) => {
  const [stackFolder, setStackFolder] = React.useState<string[]>([]);
  return (
    <PopUp open={open} handleClose={handleClose}>
      <div className='h-[450px] max-w-[600px] font-semibold'>
        <div className='p-3'>
          <Tooltip title={title}>
            <div className='mb-2 line-clamp-1 text-xl font-semibold'> Move '{title}' </div>
          </Tooltip>
          <div className='flex items-center gap-3'>
            <span>Current position:</span>
            <Stack direction='row' spacing={1} className='max-w-60'>
              <Chip
                icon={
                  <Icon
                    icon={location === 'My drive' ? 'mingcute:drive-line' : 'material-symbols:folder-outline'}
                    className='text-xl'
                  />
                }
                label={location}
                variant='outlined'
                sx={{ p: 1 }}
              />
            </Stack>
          </div>
        </div>
        {stackFolder.length === 0 ? (
          <Tab.Group>
            <div className='h-[280px] w-full sm:w-[500px] md:w-[580px] lg:w-[600px]'>
              <Tab.List className='flex w-full gap-5 px-3'>
                {tab.map((item, index) => (
                  <Tab className='flex focus:outline-none' key={index}>
                    {({ selected }) => (
                      <div
                        className={`flex grow justify-center active:bg-[#c7d8f4] ${selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]'}`}>
                        <div
                          className={`w-14 min-w-max py-3 text-sm font-medium ${selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : ''}`}>
                          {item}
                        </div>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='mt-3 h-[200px] w-full overflow-y-auto px-3 font-normal'>
                <Tab.Panel className={'h-40 overscroll-y-auto'}>
                  {fakeFolder.map((item, index) => (
                    <div
                      key={index}
                      className='flex cursor-pointer items-center gap-3 hover:bg-gray-100'
                      onDoubleClick={() => setStackFolder([...stackFolder, item.title])}>
                      <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        ) : (
          <div className='flex h-[280px] w-full flex-col gap-3 px-3 sm:w-[500px] md:w-[580px] lg:w-[600px]'>
            <div className='flex items-center gap-1'>
              <Icon
                icon='octicon:arrow-left-16'
                className='h-6 w-6 cursor-pointer rounded-full text-xl hover:bg-gray-200'
                onClick={() => setStackFolder(stackFolder.slice(0, stackFolder.length - 1))}
              />
              <span>{stackFolder[stackFolder.length - 1]}</span>
            </div>
            <div className={'h-60 w-full overflow-y-auto font-normal'}>
              {fakeFolder.map((item, index) => (
                <div
                  key={index}
                  className='flex cursor-pointer items-center gap-3 hover:bg-gray-100'
                  onDoubleClick={() => setStackFolder([...stackFolder, item.title])}>
                  <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='px-3'>
          <div className='flex items-center gap-2 text-xs'>
            <Icon icon='mingcute:drive-line' className='text-xl' />
            <span>Select a location to display the folder path</span>
          </div>
        </div>
        <DialogActions className='flex justify-end'>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant='contained'
            sx={{
              backgroundColor: '#0B57D0',
              '&:hover': {
                backgroundColor: '#0B5A9',
              },
            }}>
            Move
          </Button>
        </DialogActions>
      </div>
    </PopUp>
  );
};

export default MovePopUp;
