import React from 'react';
import PopUp from './PopUp';
import { Tab } from '@headlessui/react';
import { Button, Chip, DialogActions, LinearProgress, Link, Stack, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import ButtonSuccess from '../button/ButtonSuccess';
import { useListFolders, useMoveEntriesMutation } from '@/hooks/drive.hooks';
import CustomBreadcums from './CustomBreadcums';
import { useTheme } from '@/providers/theme-provider';
import { useStorageStore } from '@/store/storage/storage.store';
import { useSelected } from '@/store/my-drive/myDrive.store';

type MovePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  location: { id: string; name: string };
};

const tab = ['Priority', 'My Drive', 'Starred', 'Shared'];

const MovePopUp: React.FC<MovePopUpProps> = ({ open, handleClose, title, location }) => {
  const { rootId } = useStorageStore();
  const moveEntriesMutation = useMoveEntriesMutation();
  const { arrSelected } = useSelected();
  const [volumn, setvolumn] = React.useState<'Priority' | 'My Drive' | 'Starred' | 'Shared'>('Priority');
  const [curFolder, setCurFolder] = React.useState<{ id: string; name: string }>({ id: rootId, name: 'priority' });
  const [locateTo, setLocateTo] = React.useState<string>();
  const { theme } = useTheme();
  const { setArrSelected } = useSelected();
  const { data, isLoading, parents } = useListFolders(volumn, curFolder?.id);
  console.log('[MovePopUp] volumn', volumn);
  console.log(location, locateTo, curFolder);

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
                    icon={location.name === 'My drive' ? 'mingcute:drive-line' : 'material-symbols:folder-outline'}
                    className='text-xl'
                    style={{ color: theme === 'dark' ? '#F8FAFC' : 'black' }}
                  />
                }
                label={location.name}
                variant='outlined'
                classes={{ root: 'dark:border-[#F8FAFC] dark:text-[#F8FAFC] cursor-pointer' }}
                sx={{ p: 1 }}
                onClick={() => {
                  setCurFolder(location);
                }}
              />
            </Stack>
          </div>
        </div>
        {parents.length === 1 ? (
          <Tab.Group
            defaultIndex={tab.indexOf(curFolder.name)}
            selectedIndex={tab.indexOf(curFolder.name)}
            onChange={(index) => {
              setvolumn(tab[index] as 'Priority' | 'My Drive' | 'Starred' | 'Shared');
              setCurFolder({ id: rootId, name: tab[index] });
            }}>
            <div className='h-[270px] w-full sm:w-[500px] md:w-[580px] lg:w-[600px]'>
              <Tab.List className='flex w-full gap-5 px-3'>
                {tab.map((item, index) => (
                  <Tab className='flex focus:outline-none' key={index}>
                    {({ selected }) => (
                      <div
                        className={`flex grow justify-center active:bg-[#c7d8f4] dark:hover:bg-blue-950 ${
                          selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]'
                        }`}
                        onClick={() => {
                          if (item === curFolder.name) return;
                          setvolumn(item as 'Priority' | 'My Drive' | 'Starred' | 'Shared');
                          setLocateTo('');
                        }}>
                        <div
                          className={`w-14 min-w-max py-3 text-sm font-medium ${
                            selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : ''
                          }`}>
                          {item}
                        </div>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <hr className='border-t-[1px] border-gray-600' />
              <Tab.Panels className='mt-3 h-[200px] w-full overflow-y-auto font-normal'>
                {isLoading && <LinearProgress />}
                {data.length === 0 ? (
                  <div className='flex h-full items-center justify-center'>
                    <span>No folder in this location</span>
                  </div>
                ) : (
                  data.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 px-3 py-1 ${locateTo === item.id ? 'bg-[#c2e7ff] dark:bg-blue-900' : ''} ${arrSelected.some((e) => e.id === item.id) ? 'brightness-75' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-950'}`}
                      onClick={() => {
                        if (arrSelected.some((e) => e.id === item.id)) return;
                        setLocateTo(item.id);
                      }}
                      onDoubleClick={() => {
                        if (arrSelected.some((e) => e.id === item.id)) return;
                        setCurFolder({ id: item.id, name: item.title });
                      }}>
                      <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                      <span className='select-none'>{item.title}</span>
                    </div>
                  ))
                )}
              </Tab.Panels>
            </div>
          </Tab.Group>
        ) : (
          <div className='flex h-[270px] w-full flex-col gap-2 sm:w-[500px] md:w-[580px] lg:w-[600px]'>
            <div className='flex h-[46.4px] items-center gap-2 border-b-[1px] border-gray-600 px-3'>
              <Icon
                icon='octicon:arrow-left-16'
                className='h-6 w-6 cursor-pointer rounded-full text-xl hover:bg-gray-200 dark:hover:bg-blue-950'
                onClick={() => {
                  setLocateTo('');
                  setCurFolder({ id: parents[parents.length - 2].id, name: parents[parents.length - 2].name });
                }}
              />
              <span>{parents[parents.length - 1].name}</span>
            </div>
            <div className={'h-[200px] w-full overflow-y-auto font-normal'}>
              {data.length === 0 ? (
                <div className='flex h-full items-center justify-center'>
                  <span>No folder in this location</span>
                </div>
              ) : (
                data.map((item, index) => (
                  <div
                    key={index}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-1 hover:bg-gray-100 dark:hover:bg-blue-950 ${locateTo === item.id ? 'bg-[#c2e7ff] dark:bg-blue-900' : ''}`}
                    onClick={() => setLocateTo(item.id)}
                    onDoubleClick={() => setCurFolder({ id: item.id, name: item.title })}>
                    <Icon icon='mdi:folder-multiple-outline' className='text-xl' />
                    <span className='select-none'>{item.title}</span>
                  </div>
                ))
              )}
            </div>
            <hr className='border-t-[1px] border-gray-600' />
          </div>
        )}
        <div className='px-3'>
          {parents.length === 1 ? (
            <div className='flex items-center gap-2 text-xs'>
              <Icon icon='mingcute:drive-line' className='text-xl' />
              <span>Select a location to display the folder path</span>
            </div>
          ) : (
            <CustomBreadcums path={parents} onClick={(id: string, name: string) => setCurFolder({ id, name })} />
          )}
        </div>
        <DialogActions className='flex justify-end'>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <ButtonSuccess
            isInvisible={!locateTo}
            onClick={() => {
              if (arrSelected.length === 0) return;
              if (curFolder.id === location.id) return;
              moveEntriesMutation.mutate({ id: location.id, source_ids: arrSelected.map((e) => e.id), to: curFolder.id });
              setArrSelected([]);
              handleClose();
            }}
            variant='contained'
            type={'button'}>
            Move
          </ButtonSuccess>
        </DialogActions>
      </div>
    </PopUp>
  );
};

export default MovePopUp;
