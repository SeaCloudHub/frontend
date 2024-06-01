import { classNames } from '@/components/core/drop-down/Dropdown';
import { useEntryMetadata } from '@/hooks/drive.hooks';
import { useActivityLogStore, useCursorActivity, useDrawer } from '@/store/my-drive/myDrive.store';
import { Tab } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import SidePanelAction from './SidePanelAction';
import SidePanelDetail from './SidePanelDetail';

type SidePanelProps = {
  id?: string;
  title?: string;
  isHidden?: boolean;
};

const SidePanel: React.FC<SidePanelProps> = ({ id, title, isHidden }) => {
  const tabs = ['Details', 'Activity'];
  const { closeDrawer, tab, setTab } = useDrawer();
  console.log('SidePanel render', tab);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { currentCursorActivity, nextCursorActivity, setCurrentCursorActivity } = useCursorActivity();
  const { data: details, isLoading, isFetching, error } = useEntryMetadata(id || '');
  const { activityLog, setActivityLog } = useActivityLogStore();
  const [isScrolling, setIsScrolling] = React.useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
          if (nextCursorActivity !== '' && currentCursorActivity !== nextCursorActivity) {
            setIsScrolling(true);
            setTimeout(() => {
              setIsScrolling(false);
              setCurrentCursorActivity(nextCursorActivity);
            }, 1000);
          }
        }
      };

      scrollRef.current.addEventListener('scroll', handleScroll);
      return () => {
        scrollRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activityLog, currentCursorActivity, setCurrentCursorActivity, nextCursorActivity]);

  return (error || isHidden) ? (
    <div className='relative w-[360px]'>
      <div className='mb-4 mt-6 flex justify-end'>
        <Icon
          className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow dark:hover:bg-slate-400 dark:active:brightness-90'
          icon='ic:baseline-close'
          onClick={() => closeDrawer()}
        />
      </div>
      <DefaultTabPanel />
    </div>
  ) : (
    <div className='flex h-full w-[360px] flex-col overflow-hidden border-l'>
      <div className='mb-4 mt-6 flex min-h-9 w-full items-center justify-between px-6 pr-2'>
        {id ? (
          <div className='flex items-center space-x-4'>
            <div className='w-6'>
              {details ? details.icon : <Icon icon='mdi:folder-google-drive' className='h-full w-full' />}
            </div>
            <div className='text-wrap font-medium'>{!isLoading ? (details ? details.name : title) : title}</div>
          </div>
        ) : (
          <div></div>
        )}
        <Icon
          className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow dark:hover:bg-slate-400 dark:active:brightness-90'
          icon='ic:baseline-close'
          onClick={() => closeDrawer()}
        />
      </div>
      {id ? (
        <Tab.Group
          defaultIndex={tabs.indexOf(tab)}
          selectedIndex={tabs.indexOf(tab)}
          onChange={(index) => setTab(tabs[index] as 'Details' | 'Activity')}>
          <Tab.List className='flex border-b border-[#cbcbcb] pb-4'>
            {tabs.map((tab, index) => (
              <Tab key={index} className='flex basis-1/2 focus:outline-none'>
                {({ selected }) => (
                  <div
                    className={classNames(
                      'flex grow justify-center active:bg-[#c7d8f4] dark:hover:bg-blue-950',
                      selected ? 'hover:bg-[#f5f8fd] ' : 'hover:bg-[#f5f8fd]',
                    )}>
                    <div
                      className={classNames(
                        'w-14 py-3 text-sm font-medium',
                        selected ? 'border-b-[3px] border-[#0B57D0] text-[#4f86dd]' : '',
                      )}>
                      {tab}
                    </div>
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='relative h-full w-full overflow-y-auto' ref={scrollRef}>
            <Tab.Panel>
              <SidePanelDetail id={id} title={title} details={details} isLoading={isLoading} />
            </Tab.Panel>
            <Tab.Panel>
              <SidePanelAction />
              {isScrolling && (
                <div className='h-fit text-center'>
                  <CircularProgress className='translate-y-1' />
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <DefaultTabPanel />
      )}
    </div>
  );
};

export const DefaultTabPanel = () => {
  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <img className='mb-4 h-60 w-full object-cover' src={(import.meta.env.BASE_URL + 'guide1.png') as string} alt='Guide1' />
      <div>Select item to see the details</div>
    </div>
  );
};

export default SidePanel;
