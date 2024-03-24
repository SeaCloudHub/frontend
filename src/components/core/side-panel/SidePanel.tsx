import { Tab } from '@headlessui/react';
import { classNames } from '../drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';

type SidePaneProps = {
  icon: React.ReactNode;
  title: string;
};

const SidePanel: React.FC<SidePaneProps> = ({ icon, title }) => {
  return (
    <div className='ml-4 h-full w-96 overflow-y-auto rounded-2xl bg-white'>
      <div className='flex w-full items-center justify-between px-6 py-4 pr-2'>
        <div className='flex items-center space-x-4'>
          <div className='h-6 w-6'>{icon}</div>
          <div className='... truncate text-lg font-medium'>{title}</div>
        </div>
        <Icon className='h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-surfaceContainerLow' icon='ic:baseline-close' />
      </div>
      <Tab.Group>
        <Tab.List className='flex'>
          <Tab className='flex basis-1/2 focus:outline-none'>
            {({ selected }) => (
              <div
                className={classNames(
                  selected ? 'border-b-2 border-primary bg-primaryFixed text-onPrimaryContainer' : 'bg-white text-black',
                  'grow py-3 hover:brightness-95 ',
                )}>
                <div className='text-sm font-medium'>Details</div>
              </div>
            )}
          </Tab>
          <Tab className='flex basis-1/2 focus:outline-none'>
            {({ selected }) => (
              <div
                className={classNames(
                  selected ? 'border-b-2 border-primary bg-primaryFixed text-onPrimaryContainer' : 'bg-white text-black',
                  'grow py-3 hover:brightness-95 ',
                )}>
                <div className='text-sm font-medium'>Activity</div>
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SidePanel;
