import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { BsThreeDotsVertical } from 'react-icons/bs';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
};

type FileMenuProps = {
  button: React.ReactNode;
  items: MenuItem[][];
};

const FileMenu: React.FC<FileMenuProps> = ({button, items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left shadow-2xl">
      <div>
        <Menu.Button className="flex items-center">
          {button}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((group) => (
            <div key={group[0].label} className="py-1">
              {group.map(({ label, icon, action }) => (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                      onClick={action}
                    >
                      <div className="flex items-center space-x-2">
                        {icon}
                        <div>{label}</div>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FileMenu;
